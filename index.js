// A simple Node.js chatbot that tells you the current time. Powered by IBM Watson Conversation Service. Runs on the terminal.

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: "MY USERNAME", // add username
  password: "MY PASSWORD",                         // add password
  path: { workspace_id: 'MY WORKSPACE ID' }, // add workspace id
  version_date: '2017-04-21'
});

var context = {};
context.hour = -1;
context.minute = -1;

function prompt(question, callback) {
  var stdin = process.stdin,
      stdout = process.stdout;
  stdin.resume();
  stdout.write(question);
  stdin.once('data', function(data){
    callback(data.toString().trim());
  })
}
function conMessage(message) {
  var d = new Date();
  context.period = d.getHours() < 12 ? 'AM' : 'PM';
  context.hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  context.minute = d.getMinutes();


  conversation.message({
    workspace_id: 'MY WORKSPACE ID', // add workspace id
    input: {'text': message},
    context: context
  },
  function(err, response){
    if (err) console.error('error: ' + err.message);
    else {
      console.log('Watson: ' + response.output.text[0]);
      prompt('You: ', function(input){
        conMessage(input);
      });
      context = response.context;
    }
  });
}

conMessage('Hi!');







