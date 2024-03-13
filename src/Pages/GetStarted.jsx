import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const Navigate = useNavigate();


  const socket = useRef(null);

  useEffect(() => {
    // Connect to WebSocket when the component mounts
    socket.current = new WebSocket('ws://your-server-url'); // Replace with your WebSocket server URL

    // Handle incoming messages from the server
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      // Close the WebSocket connection when the component unmounts
      socket.current.close();
    };
  }, []);

  const updateChat = (input) => {
    // Check if the input is empty
    if (!input.trim()) {
      return;
    }

    // Update messages with the user's input
    setMessages((prevMessages) => [...prevMessages, { from: 'user', text: input }]);

    // Clear the input value
    document.getElementById('inputField').value = '';

    // Simulate bot typing
    setBotTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      // Handle chat logic here and get the bot's response
      const botResponse = getBotResponse(input);

      // Update messages with the bot's response
      setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: botResponse }]);

      // Stop bot typing
      setBotTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    // Implement your chat logic here
    // Return the appropriate bot response based on user input

    // Example: Echo the user's input
    return `You said: ${userInput}`;
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(recordedChunks, { type: 'audio/ogg; codecs=opus' });
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];

            // Send the recorded audio data to the server via WebSocket
            socket.current.send(JSON.stringify({ from: 'user', audio: base64data }));

            // Uncomment the following line to directly play the recorded audio locally
            // const audioUrl = URL.createObjectURL(audioBlob);
            // new Audio(audioUrl).play();
          };
          reader.readAsDataURL(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);

        // Stop recording after a duration (adjust as needed)
        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 5000); // Stop recording after 5 seconds (adjust as needed)
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  };

  return (
    <>
      {/* Your chat interface */}
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-white">
        {/* Back button */}
        <button
          type="button"
          className="absolute top-2 left-2 p-2 text-gray-600 hover:text-gray-800"
          onClick={() => Navigate("/")}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        {/* Messages container */}
        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {/* Message template */}
          {messages.map((message, key) => (
            <div key={key}>
              <div className={`flex items-end ${message.from === 'bot' ? '' : 'justify-end'}`}>
                <div className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${message.from === 'bot' ? 'order-2 items-start' : 'order-1 items-end'}`}>
                  <div>
                    {message.audio ? (
                      <audio controls>
                        <source src={`data:audio/ogg; codecs=opus;base64,${message.audio}`} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <span className={`px-4 py-3 rounded-xl inline-block ${message.from === 'bot' ? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'}`}>{message.text}</span>
                    )}
                  </div>
                </div>
                <img src={message.from === 'bot' ? 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png' : 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="" className="w-6 h-6 rounded-full" />
              </div>
            </div>
          ))}
          {/* Bot typing indicator */}
          {botTyping && (
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6" /></div>
              </div>
            </div>
          )}
        </div>
        {/* User input and send button */}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              id="inputField"
              type="text"
              placeholder="Say something..."
              autoComplete="off"
              autoFocus={true}
              onKeyDown={(e) => e.key === 'Enter' && updateChat(e.target.value)}
              className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-3"
            />
            <div className="absolute right-2 items-center inset-y-0 flex">
              <button
                type="button"
                className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isRecording ? 'active:border-4 active:border-red-400' : ''}`}
                onMouseDown={startRecording}
              >
                <span className="w-4 h-4">
                  <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g>
                      <g>
                        <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"></path>
                        <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="sr-only">Icon description</span>
              </button>
              <button
                type="button"
                className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isRecording ? 'active:border-4 active:border-red-400' : ''}`}
                onClick={() => updateChat(document.getElementById('inputField').value)}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
