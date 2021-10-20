
const Tweets = function(text){

    this.id = (function(){
            const returnId = Tweets.prototype.length;



            Tweets.prototype.push(returnId);
            console.log(returnId, "Tweets.prototype : ",Tweets.prototype);


            return returnId;

        })();
    this.text = text;
}

Tweets.prototype = Object.create([]);


var tw1 = new Tweets('tw1');
var tw2 = new Tweets('tw2');


console.log(tw1);
console.log(tw2);

