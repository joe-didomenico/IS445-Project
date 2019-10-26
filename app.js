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
    [`What is performance management?`, ``, ``, ``, ``, ``, `<p class='space'>Performance management (PM) is a set of processes and managerial behaviors that include defining, monitoring, measuring, evaluating, and providing consequences for performance expectations.`, `HRM360-ch6`],
    [`Four steps of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance.  <p class='space'>Step 2: Monitoring and evaluating performance.  <p class='space'>Step 3: Reviewing performance.  <p class='space'>Step 4: Providing consequences.`, `HRM360-ch6`],
    [`Three issues with performance management:`, ``, ``, ``, ``, ``, `<p class='space'>First, performance management practices are often obsolete.<p class='space'>Second, PM is time consuming.<p class='space'>Third, performance reviews are too narrow.`, `HRM360-ch6`],
    [` is a customized process between two or more people with the intent of enhancing learning and motivating change`, ``, ``, ``, ``, ``, `<p class='space'>Coaching`, `HRM360-ch6`],
    [`Two theories used in terms of learning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Classical conditioning modifies behavior by pairing an unconditioned stimulus with a conditioned stimulus in order to elicit an unconditioned response<p class='space'>(2) Operant conditioning modified behavior by following it with positive or negative consequences - Operant conditioning proposes that behavior can be modified by changing its consequences `, `HRM360-ch6`],
    [`Three components of operant conditioning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) A stimulus in the environment cues attention to a behavior<p class='space'>(2) Behavior occurs in response to a stimulus<p class='space'>(3) Outcomes are the consequences of our behavior `, `HRM360-ch6`],
    [`Learing Reinforcement: `, ``, ``, ``, ``, ``, `<p class='space'>Enhance desirable behavior by giving positive consequences, or withholding negative ones`, `HRM360-ch6`],
    [`Learning -   Extinction`, ``, ``, ``, ``, ``, `<p class='space'>Discourage undesirable behaviors by giving negative consequences or withholding positive consequences`, `HRM360-ch6`],
    [`Learning -   Punishment`, ``, ``, ``, ``, ``, `<p class='space'>Attaching no consequence to an undesired behavior; this may be the most effective when used alongside positive reinforcement (for desired behaviors)`, `HRM360-ch6`],
    [`Learning Desired behaviors `, ``, ``, ``, ``, ``, `<p class='space'>Positive reinforcement (give positive consequences)<p class='space'> Negative reinforcement (withhold negative consequences)  `, `HRM360-ch6`],
    [`Learning Undesired behaviors  `, ``, ``, ``, ``, ``, `<p class='space'>Extinction (give/withhold no consequences)<p class='space'>Punishment (give negative consequences or  withhold positive consequences)  `, `HRM360-ch6`],
    [`What is Social learning Theory?`, ``, ``, ``, ``, ``, `<p class='space'>Social learning theory asserts that people observe others, and model their behavior accordingly; <p class='space'>learning is enhanced when learners have high task-specific self-efficacy `, `HRM360-ch6`],
    [`What are the sources of self-efficacy?`, ``, ``, ``, ``, ``, `<p class='space'>Successful past performance<p class='space'>Vicarious experience<p class='space'>Verbal persuasion (coaching, displaying confidence) `, `HRM360-ch6`],
    [`Performance Management`, ``, ``, ``, ``, ``, `<p class='space'>Performance management is a set of processes and managerial behaviors that include defining, monitoring, evaluating, and providing consequences for performance expectations<p class='space'>Through performance management, we can regulate what employees learn and direct that learning towards completing job tasks `, `HRM360-ch6`],
    [`Four step of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance. Set goals, communicate expectations<p class='space'>Step 2: Monitoring and evaluating performance. Measure and evaluate progress and outcomes. <p class='space'>Step 3: Reviewing performance. Deliver feedback and coaching. <p class='space'>Step 4: Providing consequences. Adminiister valued rewards and appropriate punishment.`, `HRM360-ch6`],
    [`Smart Goals`, ``, ``, ``, ``, ``, `<p class='space'>Smart - an acronym for: <p class='space'>Specific<p class='space'>Measurable<p class='space'>Attainable<p class='space'>Results oriented<p class='space'>Time bound`, `HRM360-ch6`],
    [`Performance Management - There are two general categories of performance behavior:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Task performance: Work-related tasks/goals (e.g., financial goals, administrative tasks, production, etc.)<p class='space'> (2) Contextual performance: Support the social environment (e.g., helping, cooperating, providing social support) – organizational citizenship behavior `, `HRM360-ch6`],
    [`Differences between  task and contextual performance`, ``, ``, ``, ``, ``, `While task performance is often clearly defined, contextual performance is typically discretionary and not a mandatory part of an employee’s job `, `HRM360-ch6`],
    [`the process of establishing desired results that guide and direct behavior:`, ``, ``, ``, ``, ``, `Goal-setting`, `HRM360-ch6`],
    [`Goals affect performance through four routes`, ``, ``, ``, ``, ``, `<p class='space'>(1) Directing attention towards goal-relevant activities<p class='space'>(2) Energizing people towards activity and behavior<p class='space'>(3) Encouraging persistence when possible<p class='space'>(4) Eliciting the use or learning (when needed) of task-relevant knowledge and strategies `, `HRM360-ch6`],
    [`Difficult (but not impossible) and specific goals can:`, ``, ``, ``, ``, ``, `<p class='space'>enhance performance more than no goals or “do your best” goals, yet only if feedback is received throughout `, `HRM360-ch6`],
    [`Participative goal setting (vs. assigned goals):`, ``, ``, ``, ``, ``, `enhances performance if it causes a person to set difficult goals`, `HRM360-ch6`],
    [`Performance-based goals are more/less effective with complex tasks than are learning-based goals `, ``, ``, ``, ``, ``, `<p class='space'>Less`, `HRM360-ch6`],


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