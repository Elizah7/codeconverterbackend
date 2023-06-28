const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const cors = require("cors")
require("dotenv").config();
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())

app.post("/convert", async (req, res) => {
  const {code,selectedLanguage} = req.body
  console.log(req.body)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const messages = [];
  messages.push({ role: "user", content: `convert this ${code} into ${selectedLanguage} and just send the converted code if there is any error in the given code then that error should be there in converted code and if there is no declaration of any variable in given code then do not declare them in converted code do not send any text I just want converted code` });
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const completion_text = completion.data.choices[0].message.content;
    res.send({ msg: "here is the data", data: completion_text })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

app.post("/debug", async (req, res) => {
  const {code} = req.body
  console.log(req.body)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const messages = [];
  messages.push({ role: "user", content: `debug this ${code} line by line very carefully and find out every single error small or big and then explain it with correct code` });
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const completion_text = completion.data.choices[0].message.content;
    res.send({ msg: "here is the data", data: completion_text })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

app.post("/qualitycheck", async (req, res) => {
  const {code} = req.body
  console.log(req.body)
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const messages = [];
  messages.push({ role: "user", content: `analyze this ${code} line by line very carefully and check the quality of code and give the quality percantage of code in terms of professional code` });
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const completion_text = completion.data.choices[0].message.content;
    res.send({ msg: "here is the data", data: completion_text })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});


app.listen(process.env.PORT, () => {
  console.log(`runing on port ${process.env.PORT}`)
})
