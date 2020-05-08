import React, { useState, useEffect } from "react"
import MessagesWindow from "./Components/MessagesWindow"
import firebase from "./Firestore";

export default function App(props) {

  const [compliments, setCompliments] = useState([])
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [source, setSource] = useState("Czech")
  const [typing, setTyping] = useState(false)
  const [sender, setSender] = useState("Zuzka")
  const [responder] = useState("Adam")


  //Načtení komplimentů z firebase
  let db = firebase.firestore()
  const complimentsGet = db.collection('compliments').doc('compliments')

  useEffect(() => {
    complimentsGet.get().then(function (doc) {
      if (doc.exists) {
        setCompliments(doc.data().compliments)
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }, []);

  //handle change of input in text field
  const handleChange = (event) => {
    let value = event.target.value
    setText(value)
  }

  //Time to display in chat
  const getCurrentTime = () => {
    let newTime = new Date()
    let hours = newTime.getHours()
    let minutes = (newTime.getMinutes() < 10 ? "0" : "") + newTime.getMinutes()

    return (
      `${hours}:${minutes}`
    )
  }

  const randomTimeout = () => {
    return Math.floor(Math.random() * 4000) + 1000
  }

  //handle response of responder, either get it from API or from array
  const handleResponse = () => {

    setTimeout(() => {
      setTyping(true)
      if (source === "English") { handleComplimentAPI() }
      setTimeout(() => {
        if (source === "Czech") { handleCompliment() }
        setTyping(false)
      }, randomTimeout())
    }, randomTimeout())
  }

  const handleCompliment = () => {
    console.log("comps", compliments)
    let response = compliments[Math.floor(Math.random() * compliments.length)]
    let newMessage = {
      name: responder,
      time: getCurrentTime(),
      text: response
    }

    let all = messages
    all.push(newMessage)
    setMessages(all)

  }

  const handleComplimentAPI = () => {
    fetch("https://complimentr.com/api")
      .then(response => response.json())
      .then(data => {
        let newMessage = {
          name: responder,
          time: getCurrentTime(),
          text: data.compliment
        }

        let all = messages
        all.push(newMessage)
        setMessages(all)

      })
  }

  const handleSubmit = (event) => {
    if (text !== "") {
      let newMessage = { name: sender, time: getCurrentTime(), text: text }

      let all = messages
      all.push(newMessage)
      setMessages(all)

      setText("")
      handleResponse()

    }
    event.preventDefault()
  }


  let renderMessage = () => {
    let msg = ""
    for (let singleMessage of messages) {
      msg += `${singleMessage.name} (${singleMessage.time}): ${singleMessage.text} \r\n`
    }
    return msg

  }

  let handleLanguage = (event) => {
    setSource(event.target.name)

    let styling = {
      filter: "brightness(0.4)",

    }

  }

  return (
    <div>
      <h1 className="title">Adamův odpovídač</h1>
      <div className="flags">
        <img className={source !== "Czech" ? "flag inactive-flag" : "flag"} name="Czech" onClick={handleLanguage} src="https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-czech-republic2x.png" />
        <img className={source !== "English" ? "flag inactive-flag" : "flag"} name="English" onClick={handleLanguage} src="https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-united-kingdom2x.png" />
      </div>
      <div className="whole-messenger">
        <MessagesWindow
          className="messagesWindow"
          messages={messages}
          renderMessage={renderMessage}
          typing={typing}
          responder={responder}
        />

        <form className="form" onSubmit={handleSubmit}>
          <input className="input-text" onChange={handleChange} type="text" placeholder="Write a message" name="text" value={text} />
          <button className="button">Send</button>
        </form>

      </div>
    </div>
  )
}