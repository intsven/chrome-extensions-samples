import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from '../node_modules/@google/generative-ai/dist/index.mjs';

// Important! Do not expose your API in your extension code. You have to
// options:
//
// 1. Let users provide their own API key.
// 2. Manage API keys in your own server and proxy all calls to the Gemini
// API through your own server, where you can implement additional security
// measures such as authentification.
//
// It is only OK to put your API key into this file if you're the only
// user of your extension or for testing.
let apiKey = '';

let genAI = null;
let model = null;
let chat = null;
let generationConfig = {
  temperature: 1
};

const inputPrompt = document.body.querySelector('#input-prompt');
const buttonPrompt = document.body.querySelector('#button-prompt');
const buttonClear = document.body.querySelector('#button-clear');
let elementResponse = document.body.querySelector('#response');
let elementPrompt = document.body.querySelector('#prompt');
const elementLoading = document.body.querySelector('#loading');
const elementError = document.body.querySelector('#error');
const sliderTemperature = document.body.querySelector('#temperature');
const labelTemperature = document.body.querySelector('#label-temperature');
const inputApiKey = document.body.querySelector('#input-api-key');
const buttonApiKey = document.body.querySelector('#button-api-key');

let prompts = [];
let userPrompts = [];
let responses = [];
let userResponses = [];

// Remove history from storage
//chrome.storage.local.remove(['history']);

function initModel(generationConfig) {
  if (model) {
    return model;
  }
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE
    }
  ];
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    safetySettings,
    generationConfig
  });
  chat = model.startChat(
  //  history=[
  //    {"role": "user", "parts": "Hello"},
  //    {"role": "model", "parts": "Great to meet you. What would you like to know?"},
  //]
  );
  // Load chat history from local storage
  chrome.storage.local.get(['history'], (result) => {
    if (result.history) {
      const history = result.history;
      console.log('chatHistory:', history);
      chat = model.startChat({history: history.chat});
      prompts = history.prompts;
      responses = history.responses;
      userPrompts = history.userPrompts;
      userResponses = history.userResponses;
      showHistory();
    }
  });
  // Hide temperature div 
  hide(document.getElementById('div-temperature'));
  // Save api key to local storage
  chrome.storage.local.set({geminiApiKey: apiKey});
  return model;
}

async function runPrompt(userPrompt) { // example prompt: "make the font more space themed"
  try {
    let promptTemplate = "Selection: {selection}\nUser Request: ";
    if (prompts.length == 0 && chat._history.length == 0) {
      promptTemplate = "The following is the current state of the web page the user is viewing. The user will make a request to modify the state of the web page. You will return raw javascript enclosed between /executeThis/ and /untilHere/ that will be executed on the web page. The script should modify the web page in a way that is consistent with the user's request. Only code in the /executeThis/ tags will be executed. Everything else will be ignored. Never use <style> tags as those will be ignored. Instead put every change as raw javascript inside the /executeThis/ tags. If you need to include external resources you have to add those to the DOM using javascript. Follow exactly the user's request. Do not add to it or remove anything from it. Make sure that all additional libraries, fonts, scripts, images, etc. are included and added to the page if necessary. This is very important! If unsure add it to the page anyway while ensuring that nothing else is affected. Keep this rule in mind for follow-up requests. Especially if the user replies that something is not working or showing correctly make sure to add missing things. Do not write code that outputs to console unless explicitly asked to. Use other appropriate methods instead. \n\n";
      promptTemplate += "Title: {title}\n";
      promptTemplate += "URL: {url}\n";
      promptTemplate += "Content: {content}\n";
      promptTemplate += "Selection: {selection}\n";
      promptTemplate += "User Request: ";
    }
      
    /*const document = await chrome.scripting.executeScript({
      target: {tabId: (await chrome.tabs.query({active: true, currentWindow: true}))[0].id},
      function: () => {
        return {
          title: document.title,
          url: document.URL,
          content: document.documentElement.outerHTML,
          selection: window.getSelection().toString(),
        };
      }
    });*/
    // Execute the script with manifest v2 in current tab
    const document = await new Promise((resolve, reject) => {
      chrome.tabs.executeScript({
        code: `(function() {
          return {
            title: document.title,
            url: document.URL,
            content: document.documentElement.outerHTML,
            selection: window.getSelection().toString(),
          };
        })();`
      }, (result) => {
        resolve(result);
      });
    });

    

    let prompt = promptTemplate.replace("{title}", document[0].title)
                               .replace("{url}", document[0].url)
                               .replace("{content}", document[0].content)
                               .replace("{selection}", document[0].selection);
    prompt += userPrompt;
    prompts.push(prompt);
    userPrompts.push(userPrompt);
    const promptHistory = generatePromptHistory();
    //const result = await model.generateContent(promptHistory);
    //const response = await result.response;
    // const responseText = response.text();
    const response = (await chat.sendMessage(prompt)).response;
    console.log('response:', response);
    const responseText = response.candidates[0].content.parts[0].text;
    responses.push(response);
    userResponses.push(responseText);
    console.log('chat:', chat);
    // save chat history to local storage
    chrome.storage.local.set({history: {chat: chat._history, prompts: prompts, responses: responses, userPrompts: userPrompts, userResponses: userResponses}});
    return responseText;
  } catch (e) {
    console.log('Prompt failed');
    console.error(e);
    console.log('Prompt:', prompt);
    throw e;
  }
}

function generatePromptHistory() {
  let promptHistory = '';
  for (let i = 0; i < prompts.length; i++) {
    promptHistory += prompts[i];
    promptHistory += '\n\n';
    promptHistory += responses[i];
    promptHistory += '\n\n';
  }
  return promptHistory;
}

async function executeAIGeneratedScripts(response) {
  // Extract code between /executeThis/ and /untilHere/ tags
  //const scriptTags = response.match(/<script>[\s\S]*?<\/script>/g);
  const scriptTags = response.match(/\/executeThis\/[\s\S]*?\/untilHere\//g);
  console.log('scriptTags:', scriptTags);
  if (scriptTags) {
    for (let i = 0; i < scriptTags.length; i++) {
      //const script = scriptTags[i].replace(/<script>/, '').replace(/<\/script>/, '');
      let script = scriptTags[i].replace(/\/executeThis\//, '').replace(/\/untilHere\//, '');
      // Wrap script in a function to avoid conflicts with existing variables
      script = `(function() {${script}})();`;
      /*chrome.scripting.executeScript({
        target: {tabId: (await chrome.tabs.query({active: true, currentWindow: true}))[0].id},
        function: (script) => {
          //eval(script);
          const scriptElement = document.createElement('script');
          scriptElement.classList.add('aipm-ai-generated-script');
          scriptElement.textContent = script;
          document.body.appendChild(scriptElement);
        },
        args: [script]
      });*/

      // Execute the script with manifest v2 in current tab
      chrome.tabs.executeScript({
        code: script
      });

      

      // use userScripts API to execute the script
      //const url = (await chrome.tabs.query({active: true, currentWindow: true}))[0].url;
      //console.log('urlMatches:', url);
      //chrome.userScripts.register([{
      //  id: 'aipm-ai-generated-script',
      //  js: [{code: script}],
      //  //matches: ['*://*/*']
      //  // current website
      //  matches: [url]
      //}]);
      //console.log(chrome.userScripts);
      // Execute the registered script
      



    }
  }
}

sliderTemperature.addEventListener('input', (event) => {
  labelTemperature.textContent = event.target.value;
  generationConfig.temperature = event.target.value;
});

inputPrompt.addEventListener('input', () => {
  if (inputPrompt.value.trim()) {
    buttonPrompt.removeAttribute('disabled');
  } else {
    buttonPrompt.setAttribute('disabled', '');
  }
});

// Add enter key event listener to inputPrompt
inputPrompt.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    buttonPrompt.click();
  }
});

buttonPrompt.addEventListener('click', async () => {
  const prompt = inputPrompt.value.trim();
  if (!prompt) {
    return;
  }
  showLoading();
  try {
    generationConfig = {
      temperature: sliderTemperature.value
    };
    initModel(generationConfig);
    const response = await runPrompt(prompt, generationConfig);
    await executeAIGeneratedScripts(response);
    showPrompt(prompt);
    showResponse(response);
    savePopupState();
  } catch (e) {
    showError(e);
  }
});

buttonClear.addEventListener('click', () => {
  prompts = [];
  responses = [];
  userPrompts = [];
  userResponses = [];
  chrome.storage.local.remove(['history']);
  chat = model.startChat();
  // Delete all chat history elements
  let element = elementPrompt;
  while (element.previousElementSibling) {
    element.parentNode.removeChild(element.previousElementSibling);
  }
  elementPrompt = document.body.querySelector('#prompt');
  elementResponse = document.body.querySelector('#response');
});

function showLoading() {
  hide(elementResponse);
  hide(elementError);
  show(elementLoading);
}

function showResponse(response) {
  hide(elementLoading);
  show(elementResponse);
  
  // Make sure to preserve line breaks in the response
  elementResponse.textContent = '';
  const paragraphs = response.split(/\r?\n/);
  let isCodeBlock = false;
  let codeElement = document.createElement('div');
  codeElement.classList.add('aipm-code-block');
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].startsWith('/executeThis/')) {
      isCodeBlock = true;
    } else if (paragraphs[i].startsWith('/untilHere/')) {
      isCodeBlock = false;
      codeElement = document.createElement('div');
      codeElement.classList.add('aipm-code-block');
    }
    const paragraph = paragraphs[i].replace(/\/executeThis\//, '').replace(/\/untilHere\//, '');
    if (paragraph) {
      const textNode = document.createTextNode(paragraph);
      if (isCodeBlock) {
        // Put code blocks in a code element
        codeElement.appendChild(textNode);
        elementResponse.appendChild(codeElement);
      } else
        elementResponse.appendChild(textNode);
    }
    // Don't add a new line after the final paragraph
    if (i < paragraphs.length - 1 && i > 0) {
      if (isCodeBlock)
        codeElement.appendChild(document.createElement('BR'));
      else
        elementResponse.appendChild(document.createElement('BR'));
    }
  }

  // Duplicate elementResponse
  let newElementResponse = elementResponse.cloneNode(true);
  // Add the duplicate element to the document
  elementResponse.parentNode.appendChild(newElementResponse);
  elementResponse = newElementResponse;
  hide(elementResponse);
}

function showPrompt(prompt) {
  show(elementPrompt);
  elementPrompt.textContent = prompt;
  // Duplicate elementPrompt
  let newElementPrompt = elementPrompt.cloneNode(true);
  elementPrompt.parentNode.appendChild(newElementPrompt);
  elementPrompt = newElementPrompt;
  hide(elementPrompt);

  // Clear the input field
  inputPrompt.value = '';
}

function showHistory() {
  for (let i = 0; i < userPrompts.length; i++) {
    showPrompt(userPrompts[i]);
    showResponse(userResponses[i]);
  }
}

function savePopupState() {
  // Save the current state of the popup
  chrome.storage.local.set({popupState: document.body.innerHTML});
}

function showError(error) {
  show(elementError);
  hide(elementResponse);
  hide(elementLoading);
  elementError.textContent = error;
}

function show(element) {
  element.removeAttribute('hidden');
}

function hide(element) {
  element.setAttribute('hidden', '');
}

// Load the API key from local storage
chrome.storage.local.get(['geminiApiKey'], (result) => {
  if (result.geminiApiKey) {
    apiKey = result.geminiApiKey;
    try {
      initModel(generationConfig);
      hide(inputApiKey);
      hide(buttonApiKey);
    }
    catch (e) {
      showError(e);
    }
  }
});

buttonApiKey.addEventListener('click', () => {
  apiKey = inputApiKey.value;
  try {
    model = null;
    initModel(generationConfig);
    hide(inputApiKey);
    hide(buttonApiKey);
  }
  catch (e) {
    showError(e);
  }
});
