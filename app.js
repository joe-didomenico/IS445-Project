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
[`What is Organizational behavior?`,``,``,``,``, ``,`<p class='space'>the study of individual behavior and group dynamics in organizations`, `HRM360-ch1`],
[`Common Sense`,``,``,``,``, ``,`<p class='space'>Human behavior at work is NOT common sense, there is not one best way to manage people. <p class='space'>Common sense works in stable situations with predictable outcomes…<p class='space'> those aren’t the important ones. <p class='space'>Common sense “short-circuits” our motivation to actually THINK about an issue, and make intelligent decisions., <p class='space'>Common sense is skewed by our personal experiences and biases,<p class='space'> it is subjective, and is only a distorted reflection of objective reality`, `HRM360-ch1`],
[`The importance of technical skill verses personal skills changes over one's career. How? PP ch1 slide 6`,``,``,``,``, ``,`<p class='space'>Initially technical skills are of the greatest importance, but eventually personal skills become more important.`, `HRM360-ch1`],
[`What is the problem solving approach? PP ch1 slide 7.`,``,``,``,``, ``,`<p class='space'>Three basic steps to how we’re going to solve problems in this class  <p class='space'> STEP 1: Define the problem    - Define problems in terms of desired outcomes. Then test each one by asking, “Why is this a problem?”  <p class='space'>STEP 2: Identify potential causes using OB concepts and theories   <p class='space'> STEP 3: Make recommendations and (if appropriate) take action. Inputs or antecedents - processes, experiences, or mechanisms - outcomes`, `HRM360-ch1`],
[`There are two overall factors that interact to influence human behavior in organizations`,``,``,``,``, ``,`<p class='space'>Person factors: The characteristics that give people their unique identities and sense of self<p class='space'>Situation factors: All the elements outside ourselves that influence what we feel, think, and do  `, `HRM360-ch1`],
[`Due to the fundamental nature of human beings, two sides of the organization arise:`,``,``,``,``, ``,`<p class='space'>Formal Organization: <p class='space'>The official: legitimate, structured, and most visible part of the system <p class='space'> Informal Organization:<p class='space'> The unofficial: psychological, organic, and less visible part of the system  `, `HRM360-ch1`],
[`Two Sides of Organizations - Formal organization   `,``,``,``,``, ``,`<p class='space'>Formal organization   (overt) Goals and objectives  Policies and procedures  Job descriptions  Financial resources  Authority structure  Communication channels  Products and services`, `HRM360-ch1`],
[`Two Sides of Organizations - Informal organization   `,``,``,``,``, ``,`<p class='space'>Informal organization   (human side) (covert) Beliefs and assumptions   Perceptions and attitudes, values, feelings, such as fear, joy  anger, trust, and hope, group norms, informal leaders`, `HRM360-ch1`],
[`Hawthorne Effect - lecture notes`,``,``,``,``, ``,`<p class='space'>The Hawthorne effect (also referred to as the observer effect) is a type of reactivity in which individuals modify an aspect of their behavior in response to their awareness of being observed.`, `HRM360-ch1`],
[`contingency approach- Text page 5`,``,``,``,``, ``,`<p class='space'>calls for using the OB concepts and tools that best suit the situation, instead of trying to rely on “one best way.”  <p class='space'>This means there is no single best way to manage people, teams, or organizations. A particular management practice that worked today may not work tomorrow. What worked with one employee may not work with another. The best or most effective course of action instead depends on the situation.`, `HRM360-ch1`],
[`The Stanford Graduate School of Business asked the members of its Advisory Council which skills are most important for their MBA students`,``,``,``,``, ``,`<p class='space'>self-awareness -  When you know yourself, you are comfortable with your strengths and not crippled by your shortcomings. <p class='space'>Self-awareness gives you the capacity to learn from your mistakes as well as your successes`, `HRM360-ch1`],
[`Three major weaknesses of common sense`,``,``,``,``, ``,`<p class='space'>(1) Overreliance on hindsight - Common sense works best in well-known or stable situations with predictable outcomes<p class='space'>(2) Lack of rigor  -  People comfortable with common-sense responses may not apply the effort required to appropriately analyze and solve problems<p class='space'>(3) Lack of objectivity -  Common sense can be overly subjective and lack a basis in science.`, `HRM360-ch1`],
[`What are some hard and soft skills?`,``,``,``,``, ``,`<p class='space'>Hard skills are the technical expertise and knowledge required to do a particular task or job function, such as financial analysis, accounting, or operations. <p class='space'>Soft skills relate to human interactions and include both interpersonal skills and personal attributes.`, `HRM360-ch1`],
[`Ethics guides`,``,``,``,``, ``,`<p class='space'>behavior by identifying right, wrong, and the many shades of gray in between.<p class='space'>Unethical Does Not Mean Illegal - very few unethical acts are also illegal, most are not punished in any way, and even if illegal, few are prosecuted.`, `HRM360-ch1`],
[`Why am I disengaged?`,``,``,``,``, ``,`<p class='space'>One common reason, backed by science, is that you perceive you were evaluated unfairly in your recent performance review.<p class='space'>“Why or how did this cause disengagement?” Because if you feel unappreciated for what you’ve done, you are not motivated to go the extra mile to help your coworkers or customers. <p class='space'>Asking “why” multiple times and following the line of reasoning will lead you to define and identify problems and causes more accurately.`, `HRM360-ch1`],
[`Person factors`,``,``,``,``, ``,`<p class='space'>Person factors are the infinite characteristics that give individuals their unique identities. These characteristics combine to influence every aspect of your life. <p class='space'>In your job and career, they affect your goals and aspirations, the plans you make to achieve them, the way you execute such plans, and your ultimate level of achievement.`, `HRM360-ch1`],
[`Situation factors`,``,``,``,``, ``,`<p class='space'>Situation factors are all the elements outside ourselves that influence what we do, the way we do it, and the ultimate results of our actions. A potentially infinite number of situation factors can either help or hinder you when you are trying to accomplish something (see the following Problem-Solving Application box) .`, `HRM360-ch1`],
[`People and Situations Are Dynamic (key point)`,``,``,``,``, ``,`<p class='space'>It also is true that the current job market and employer expectations differ from those at the height of the technology bubble in the late 1990s or in the depths of the Great Recession in 2007–2009. In the first scenario employees changed, and in the second the situation or environment changed. <p class='space'>The bottom-line implication for OB and your work life is that knowledge of one type of factor without the other is insufficient. You need to understand the interplay between both person and situation factors to be an effective employee and manager.`, `HRM360-ch1`],
[`Levels—Individual, Group/Team, and Organization (key point)`,``,``,``,``, ``,`<p class='space'>OB distinguishes among three levels at work: individual, group/team, and organizational.<p class='space'>Some people quit because their job doesn’t fulfill what they value, such as challenging and stimulating work (an individual-level input) .<p class='space'>Others quit because of conflicts with their boss or because they have nothing in common with their coworkers (a group/team-level process) .<p class='space'>A common reason people quit is a faulty reward system that unfairly distributes raises, bonuses, and recognition (an organizational-level process) .`, `HRM360-ch1`],
[`Applying OB Concepts to Identify the Right Problem (key point)`,``,``,``,``, ``,`<p class='space'>Nothing causes more harm than solving the wrong problem. To illustrate, assume that many people in your department at work are quitting. <p class='space'>What could be the reason? The person–situation distinction allows you to consider unique individual factors as well as situation factors that might be the source of the problem. And considering the levels of individual, group, and organization will allow you to look at each for possible causes.`, `HRM360-ch1`],
[`Applied Approaches to Selecting a Solution (key point)`,``,``,``,``, ``,`<p class='space'>Resolving problems: is arguably the most common action managers take and simply means choosing a satisfactory solution, one that works but is less than ideal. Putting on a “doughnut” or temporary spare tire fixes a flat, but it certainly is not ideal and is unlikely to last.<p class='space'>Solving problems: is the optimal or ideal response. For instance, you could buy a new, high-quality, full-size spare to keep in your trunk (not the typical doughnut or the “run-flats” that manufacturers frequently provide) .<p class='space'>Dissolving problems: requires changing or eliminating the situation in which the problem occurs. Keeping with our example, the city you live in could build and utilize effective public transportation and thus remove the necessity of having cars (and tires) altogether.`, `HRM360-ch1`],
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
[`passive listening style`,``,``,``,``, ``,`<p class='space'>Passive—It’s not my responsibility to listen. Passive listeners are not equal partners in a speaking–listening exchange. They assume the speaker is responsible for the quality of the interaction and believe their role is to passively take in information. Passive listeners will display attentiveness, but they can fake it at times. Overall, they don’t expend much motivation or energy in receiving and decoding messages.`, `HRM360-CH09`],
[`detached listening style`,``,``,``,``, ``,`<p class='space'>Detached—I’m uninterested. Detached listeners tend to withdraw from the interaction. They appear inattentive, bored, distracted, and uninterested. They may start using mobile devices during the speaking–listening exchange. Their body language will reflect lack of interest, such as slumping and avoiding direct eye contact.`, `HRM360-CH09`],

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
