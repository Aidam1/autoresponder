import React, {useEffect, useRef} from 'react'


//https://codesandbox.io/s/scrolltobottomexample-f90lz
export default function MessagesWindow(props) {
    const messagesEndRef = useRef();
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, [props.messages.length]);

    return (
        <div className = "messages-container" >
            <div className = "messages-window">{props.renderMessage()}
            <div className ="reference" ref={messagesEndRef} />
            </div>
            
            <p className = "typing">{props.typing ? props.responder + " is typing...":" "}</p>
        </div>
    )
}
