
//  import  { sendMessage } from 'fast-two-sms'
import dotenv from 'dotenv'
import cors from 'cors'
import initMB from 'messagebird';
const messagebird = initMB(process.env.YOUR_ACCESS_KEY);


const sendOTP = async(number)=>{

  var params = {
    'originator': 'TestMessage',
    'recipients': [
      number
  ],
    'body': 'This is a test message'
  };

  messagebird.messages.create(params, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log(response);
  });
}
      
// const sendOTP = async(message, number, res)=>{
//     const option = {
//         authorization:"wUlUBg2DEAzrY3THHnMz1xZPmlyJXJjcbDlp22pwtek9hPTfw33EJCdRbP5h",
//         sender_id:"FSTSMS",
//         language:'english',
//         route:'p',     
//         message:message,
//         numbers:[number]
//     }
    
    
//     // send to message
    
    
//     await sendMessage(option)
//     .then((response)=>{
//       res.status(200).json({msg:"SMS sent successfully",response})
//     })
//     .catch((err)=>{
//       res.status(500).json({msg:err})
//     })


// }





export default sendOTP