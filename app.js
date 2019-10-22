'use strict'
let mPos = 0,
    mTest, mTest_status, mQuestion, mChoice, mChoices, mCha, mChB, mChC, mChD, mCorrect = 0;
let mSkipped = 0;
// buttons-panel is the control panel    
let buttonPanel = document.getElementById('button-panel');
let arryTopics = [];
const TOPIC = 7; // answer is in position 5 of the array

let flagShuffle = false;

let mStrResult = '<p>Missed question(s):<p>';

let arrMissedQuestions = [];

let mQuestions = [];
const mQuestionsAll = [
    
[`Need to be updated`,``,``,``,``, ``,`Generally, people tend to perceive and recall positive feedback more accurately than they do negative feedback. But negative feedback `, `HRM360-ch?`],
[` punctuated equilibrium`,``,``,``,``, ``,`<p class='space'>Groups establish periods of stable functioning until an event causes a dramatic change in norms, roles, and/or objectives. <p class='space'>The group then establishes and maintains new norms of functioning, returning to equilibrium`, `HRM360-CH08`],
[`Social loafing is:`,``,``,``,``, ``,`<p class='space'>Social loafing is the tendency for individual effort to decline as group size increases. `, `HRM360-CH08`],
[`Anything that interferes with the transmission and understanding of a message. `,``,``,``,``, ``,`<p class='space'>Noise is anything that interferes with the transmission and understanding of a message. `, `HRM360-CH08`],
[`Crucial conversations are?`,``,``,``,``, ``,`<p class='space'>Crucial conversations are discussions between two or more people where <p class='space'>(1) the stakes are high, <p class='space'>(2) opinions vary, and <p class='space'>(3) emotions run strong.`, `HRM360-CH09`],
[`The acronym STATE means?`,``,``,``,``, ``,`<p class='space'>Share your facts. Start with the least controversial, most persuasive elements that support what you want for yourself and for the relationship.  <p class='space'>Tell your story. Enhance what you want by describing what has happened, how you’ve arrived where you are, how you’d like to see it change, and why. It may help to add what you don’t want personally or for the relationship.  <p class='space'>Ask for others’ facts and stories. This is key to creating dialogue, which is essential if you’re to have a productive crucial conversation. Don’t talk at but instead talk with others. Approach all crucial conversations as two-way exchanges. Don’t be accusatory, but instead simply describe the situation, the way you feel, and what you would like to see happen. Use “I” instead of “you.”   <p class='space'>Talk tentatively. Keep in mind that you’re telling a story, not stating facts. The facts come first, then you can add “color” or describe the impact on you via your story. In other words, don’t pound the podium and talk like you’re “preaching” facts.  <p class='space'>Encourage testing.  Make it safe for others to share their (opposing) views. Allow them to share or test their ideas, thoughts, and feelings. Don’t interrupt, steamroll, or intimidate. `, `HRM360-CH09`],
[`Listening is the?`,``,``,``,``, ``,`<p class='space'>  Listening is the process of actively decoding and interpreting verbal messages. <p class='space'>It requires cognitive attention and information processing; simply hearing does not. <p class='space'>There is general consensus that listening is a cornerstone skill of communication competence.`, `HRM360-CH09`],
[`Active listening style`,``,``,``,``, ``,`<p class='space'> Active—I’m fully invested. Active listeners are “all in.” That is, they are motivated to listen and give full attention when others are talking. They focus on what is being communicated and expend energy by participating in the discussion. They also use positive body language, such as leaning in or making direct eye contact, to convey interest.`, `HRM360-CH09`],
[`occurs when people perceive they are being attacked or threatened.`,``,``,``,``, ``,`<p class='space'>Defensiveness occurs when people perceive they are being attacked or threatened.`, `HRM360-CH09`],
[`involved listening style`,``,``,``,``, ``,`<p class='space'>Involved—I’m partially invested. Involved listeners devote some, but not all, of their attention and energy to listening. They reflect on what is being said and halfheartedly participate in the discussion. Their use of nonverbal cues tends to be inconsistent or intermittent, and they can show nonverbal signs of interest and noninterest in the same conversation.`, `HRM360-CH09`],
[`suggests that the more members of different groups interact, the less intergroup conflict they will experience. `,``,``,``,``, ``,`<p class='space'> contact hypothesis `, `HRM360-CH10`],
[`passive listening style`,``,``,``,``, ``,`<p class='space'>Passive—It’s not my responsibility to listen. Passive listeners are not equal partners in a speaking–listening exchange. They assume the speaker is responsible for the quality of the interaction and believe their role is to passively take in information. Passive listeners will display attentiveness, but they can fake it at times. Overall, they don’t expend much motivation or energy in receiving and decoding messages.`, `HRM360-CH09`],
[`Negotiation is`,``,``,``,``, ``,`<p class='space'> a give-and-take decision-making process between two or more parties with different preferences. `, `HRM360-CH10`],
[`detached listening style`,``,``,``,``, ``,`<p class='space'>Detached—I’m uninterested. Detached listeners tend to withdraw from the interaction. They appear inattentive, bored, distracted, and uninterested. They may start using mobile devices during the speaking–listening exchange. Their body language will reflect lack of interest, such as slumping and avoiding direct eye contact.`, `HRM360-CH09`],
[`personality conflict`,``,``,``,``, ``,`<p class='space'> personality conflict is interpersonal opposition based on personal dislike or disagreement.`, `HRM360-CH10`],
[`assigns someone the role of critic. `,``,``,``,``, ``,`<p class='space'>devil’s advocacy assigns someone the role of critic. `, `HRM360-CH10`],
[`usually concerns a single issue—a “fixed pie”—in which one person gains at the expense of another`,``,``,``,``, ``,`<p class='space'> distributive negotiation `, `HRM360-CH10`],
[`Conflict occurs:`,``,``,``,``, ``,`<p class='space'>Conflict occurs when one “party perceives that its interests are being opposed or negatively affected by another party.”<p class='space'> The word perceives reminds us that sources of conflict and issues can be real or imagined, just like perceptions of fairness. <p class='space'>A lack of fairness, perceived or real, is a major source of conflict at work. `, `HRM360-CH10`]

];

/**

 * Randomly shuffle an array

 * https://stackoverflow.com/a/2450976/1293256

 * @param  {Array} array The array to shuffle

 * @return {String}      The first item in the shuffled array

 */

var shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

function popArray() {
    //blank array
    arryTopics = [];
    for (let index = 0; index < mQuestions.length; index++) {
        console.log(arryTopics.includes('B'));
        if (arryTopics.includes(mQuestions[index][TOPIC]) !== true) {
            arryTopics.push(mQuestions[index][TOPIC]);
            addToListbox('lb', mQuestions[index][TOPIC]);
        }
    }
    // console.log(`
    //         arryTopics.length = ` + arryTopics.length);
}

function addToListbox(lbId, itemToAdd) {
    var x = document.getElementById(lbId);
    var option = document.createElement("option");
    option.text = itemToAdd;
    x.add(option);
}


function getId(x) {
    return document.getElementById(x);
}

function renderQuestion() {
    //div_test_doc = getId("test_instructions");
    mTest = getId("test");
    if (flagShuffle == true) {
        mQuestions = shuffle(mQuestions);
        //clear shuffle flag
        flagShuffle = false;
    }
    if (mPos >= mQuestions.length) {
        //are we done?
        var btnRedo = "<button onclick='doMissedQuestions()'>Redo Missed Question&#40s&#41</button>";
        var strscore = mCorrect / (mQuestions.length - mSkipped) * 100,
            strcor = mCorrect,
            strtotal = mQuestions.length - mSkipped;
        if (mCorrect == mQuestions.length) {
            mStrResult = 'Great Job!';
            btnRedo = '';
        }
        strscore = strscore.toFixed(0);
        mTest.attr
        mTest.innerHTML = strcor + " of " + strtotal + " [" + strscore + "%]" + '<p>' + mStrResult + '<br><br> Refresh the page to take the test again.';
        mTest.innerHTML += btnRedo;
        getId("test_status").innerHTML = "Test Complete";
        getId("test").setAttribute("style", "text-align: left; padding:10px 40px 40px 40px; ");
        let newTestdb = {
            Title: new Date()
        };
        mPos = 0;
        mCorrect = 0;
        return false;
    }

    getId("test_status").innerHTML = "Question " + (mPos + 1) + " of " + mQuestions.length + "<br>";

    // grab current question 
    mQuestion = mQuestions[mPos][0];
    // render question[mPos][6] == ""
    if (mQuestions[mPos][6] == "") {
        // set answers
        mCha = mQuestions[mPos][1];
        mChB = mQuestions[mPos][2];
        mChC = mQuestions[mPos][3];
        mChD = mQuestions[mPos][4];
        //add question to test div
        mTest.innerHTML = "<p>" + question + "</p>";
        //add answers
        mTest.innerHTML += "<input type='radio' name='choices' value='A'> " + mCha + "<br>";
        mTest.innerHTML += "<input type='radio' name='choices' value='B'> " + mChB + "<br>";
        mTest.innerHTML += "<input type='radio' name='choices' value='C'> " + mChC + "<br>";
        mTest.innerHTML += "<input type='radio' name='choices' value='D'> " + mChD + "<br><br><br>";
        buttonPanel.innerHTML = "<div class='button'><button onclick='checkAnswer()'>Submit Answer</button></div>";
        // add test submit button to btn panel if not the first question
        if (mPos > 0) {
            buttonPanel.innerHTML += "<div class='button' ><button style='float align=right' onclick='sub_test()'>Submit Test</button></div>";
        }
    } else {
        //this is just study notes
        mTest.innerHTML = "<p>" + mQuestions[mPos][0] + "</p>";

        buttonPanel.innerHTML = "<div class='button'><button onclick='show_answer()'>Show Answer</button></div>";
        buttonPanel.innerHTML += "<div class='button'><button onclick='checkAnswer()'>Submit Answer</button></div>";
        buttonPanel.innerHTML += "<div class='button' ><button style='float align=right' onclick='sub_test()'>End</button></div>";
        buttonPanel.innerHTML += "<div class='button'><button onclick='skip()'>Skip</button></div>";
    }

}

function show_answer() {
    mTest = getId("test");
    mTest.innerHTML = "<p>" + mQuestion + "</p>";
    mTest.innerHTML += "<p>" + mQuestions[mPos][6] + "</p>";
    buttonPanel.innerHTML = "<div class='button'><button onclick='checkAnswer()'>Submit Answer</button></div>";
    buttonPanel.innerHTML += "<div class='button' ><button style='float align=right' onclick='sub_test()'>End</button></div>";
    buttonPanel.innerHTML += "<div class='button'><button onclick='skip()'>Skip</button></div>";
}

function sub_test() {
    mQuestions.length = mPos;
    renderQuestion();
}

function doMissedQuestions() {
    //load missed questions into master array
    mQuestions = arrMissedQuestions;
    //clear missed questions array
    arrMissedQuestions = [];
    mStrResult = '<p>Missed question(s):<p>';
    mPos = 0;
    mCorrect = 0;
    renderQuestion();
}

function loadSelectedQuestions() {
    //load missed questions into master array
    mQuestions = arrMissedQuestions;
    //clear missed questions array
    arrMissedQuestions = [];
    mStrResult = '<p>Missed question(s):<p>';
    mPos = 0;
    mCorrect = 0;
    renderQuestion();
}

function checkAnswer() {
    mChoices = document.getElementsByName("choices");
    mChoice = -1;
    let strAnsGiven = 'No answer selected';
    for (var i = 0; i < mChoices.length; i++) {
        if (mChoices[i].checked) {
            actChoice = i;
            mChoice = mChoices[i].value;
        }
    }

    if (mChoice == mQuestions[mPos][5]) {
        mCorrect++;
    } else {
        if (mChoice != -1) {
            strAnsGiven = mQuestions[mPos][actChoice + 1];
        }
        // add missed question into missed array
        arrMissedQuestions.push(mQuestions[mPos]);
        mStrResult = mStrResult + '<p>' + (mPos + 1) + '). ' + mQuestions[mPos][0] + '<p><pre>        Your answer: <b>' + strAnsGiven + '</b></pre><p>';
    }
    mPos++;
    renderQuestion();
}

function skip() {
    mPos++;
    mSkipped++;
    renderQuestion();
}
document.getElementById('btnAdd').addEventListener('click', function() {
    const e = document.getElementById('lb');
    const strUser = e.options[e.selectedIndex].value;
    // e.options.add(strUser);
    const lbAdded = document.getElementById('itemsSelected');
    // alert(`${strUser}  in lbAdded.options !== true`);
    // debugger;
    if (isInListbox(lbAdded, strUser) !== true)
    //not in the lb so addit
        addToListbox('itemsSelected', strUser);
});

function isInListbox(lbObj, lbString) {
    let result;
    let index = 0;
    for (index = 0; index < lbObj.length; index++) {
        if (lbString === lbObj.options[index].value) {
            result = true;
            break;
        }
    }
    return (result);
}
// window.addEventListener('click', function() { alert("Add clicked"); });
function loadQuestionsArray() {
    mQuestions = mQuestionsAll.slice(0);
    const lbAdded = document.getElementById('itemsSelected');
    if (lbAdded.length > 0) {
        mQuestions = [];
        for (let index = 0; index < mQuestionsAll.length; index++) {
            if (isInListbox(lbAdded, mQuestionsAll[index][TOPIC])) {
                mQuestions.push(mQuestionsAll[index]);

            }
        }
    }
    arrMissedQuestions = [];
    mStrResult = '<p>Missed question(s):<p>';
    mPos = 0;
    mCorrect = 0;
    if (document.getElementById('flagShuffle').checked === true)
    //set shuffle flag if checked
        flagShuffle = true;
    else
        flagShuffle = false;
    renderQuestion();
}


const btnOptions = document.getElementById('btnshow');
const optPanel = document.getElementById('list-topics');

loadQuestionsArray();
document.getElementById("loadSubsetBtn").addEventListener('click', loadQuestionsArray, false);
window.addEventListener("load", renderQuestion, false);
window.addEventListener("load", popArray, false);
// document.getElementById('flagShuffle').addEventListener('click', function() {

// })
btnOptions.addEventListener('click', function() {
    optPanel.classList.toggle('hidden');
})
