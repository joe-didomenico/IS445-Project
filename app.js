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

    [`What is performance management?`, ``, ``, ``, ``, ``, `<p class='space'>Performance management (PM) is a set of processes and managerial behaviors that include:<p class='space'> (1) Defining, <p class='space'> (2) Monitoring, <p class='space'> (3) Measuring, evaluating, and <p class='space'> (4) Providing consequences for performance expectations.`, `HRM360-ch6`],
    [`Four steps of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance.  <p class='space'>Step 2: Monitoring and evaluating performance.  <p class='space'>Step 3: Reviewing performance.  <p class='space'>Step 4: Providing consequences.`, `HRM360-ch6`],
    [`Three issues with performance management:`, ``, ``, ``, ``, ``, `<p class='space'>(1) performance management practices are often obsolete.<p class='space'>(2) performance management is time consuming.<p class='space'>(3) performance reviews are too narrow.`, `HRM360-ch6`],
    [`Coaching is: `, ``, ``, ``, ``, ``, `<p class='space'> A customized process between two or more people with the intent of enhancing learning and motivating change`, `HRM360-ch6`],
    [`Two theories used in terms of learning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Classical conditioning<p class='space'> Modifies behavior by pairing an unconditioned stimulus with a conditioned stimulus in order to elicit an unconditioned response<p class='space'>(2) Operant conditioning<p class='space'> Modifies behavior by following it with positive or negative consequences - Operant conditioning proposes that behavior can be modified by changing its consequences `, `HRM360-ch6`],
    [`Three components of operant conditioning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) A stimulus in the environment cues attention to a behavior<p class='space'>(2) Behavior occurs in response to a stimulus<p class='space'>(3) Outcomes are the consequences of our behavior `, `HRM360-ch6`],
    [`Learning - Reinforcement: `, ``, ``, ``, ``, ``, `<p class='space'>Enhances desirable behavior by giving positive consequences, or withholding negative ones`, `HRM360-ch6`],
    [`Learning - Extinction`, ``, ``, ``, ``, ``, `<p class='space'>Weakening a behavior by ignoring it or making sure it is not reinforced is referred to as extinction<p class='space'>Attaching no consequence to an undesired behavior; this may be the most effective when used alongside positive reinforcement (for desired behaviors)`, `HRM360-ch6`],
    [`Learning - Punishment`, ``, ``, ``, ``, ``, `<p class='space'>Discourage undesirable behaviors by giving negative consequences or withholding positive consequences`, `HRM360-ch6`],
    [`Learning - Desired behaviors `, ``, ``, ``, ``, ``, `<p class='space'>Positive reinforcement (give positive consequences)<p class='space'> Negative reinforcement (withhold negative consequences)  `, `HRM360-ch6`],
    [`Learning - Undesired behaviors  `, ``, ``, ``, ``, ``, `<p class='space'>Extinction (Weakening a behavior by ignoring it or making sure it is not reinforced is referred to as extinction)<p class='space'>Punishment (give negative consequences or  withhold positive consequences)  `, `HRM360-ch6`],
    [`What is Social Learning Theory?`, ``, ``, ``, ``, ``, `<p class='space'>Social learning theory asserts that people observe others, and model their behavior accordingly; <p class='space'>Learning is enhanced when learners have high task-specific self-efficacy (which means they believe they can do something)`, `HRM360-ch6`],
    [`What are the sources of self-efficacy?`, ``, ``, ``, ``, ``, `<p class='space'>Successful past performance<p class='space'>Vicarious experience - (seeing others like us successfully completing similar work)  <p class='space'>Verbal persuasion (coaching, displaying confidence) `, `HRM360-ch6`],
    [`Performance Management`, ``, ``, ``, ``, ``, `<p class='space'>Performance management is a set of processes and managerial behaviors that include defining, monitoring, evaluating, and providing consequences for performance expectations<p class='space'>Through performance management, we can regulate what employees learn and direct that learning towards completing job tasks `, `HRM360-ch6`],
    [`Four steps of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance. Set goals, communicate expectations<p class='space'>Step 2: Monitoring and evaluating performance. Measure and evaluate progress and outcomes. <p class='space'>Step 3: Reviewing performance. Deliver feedback and coaching. <p class='space'>Step 4: Providing consequences. Administer valued rewards and appropriate punishment.`, `HRM360-ch6`],
    [`Smart Goals`, ``, ``, ``, ``, ``, `<p class='space'>Smart - an acronym for: <p class='space'>Specific<p class='space'>Measurable<p class='space'>Attainable<p class='space'>Results oriented<p class='space'>Time bound`, `HRM360-ch6`],
    [`Performance Management - There are two general categories of performance behavior:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Task performance: <p class='space'>Work-related tasks/goals (e.g., financial goals, administrative tasks, production, etc.)<p class='space'> (2) Contextual performance: <p class='space'>Support the social environment (e.g., helping, cooperating, providing social support) – organizational citizenship behavior `, `HRM360-ch6`],
    [`Differences between  task and contextual performance`, ``, ``, ``, ``, ``, `<p class='space'>Task performance is often clearly defined.<p class='space'>Contextual performance is typically discretionary and not a mandatory part of an employee’s job.`, `HRM360-ch6`],
    [`The process of establishing desired results that guide and direct behavior`, ``, ``, ``, ``, ``, `<p class='space'>Goal-setting`, `HRM360-ch6`],
    [`Goals affect performance through four routes:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Directing attention towards goal-relevant activities<p class='space'>(2) Energizing people towards activity and behavior<p class='space'>(3) Encouraging persistence when possible<p class='space'>(4) Eliciting the use or learning (when needed) of task-relevant knowledge and strategies `, `HRM360-ch6`],
    [`Difficult (but not impossible) and specific goals can:`, ``, ``, ``, ``, ``, `<p class='space'>Enhance performance<p class='space'>     More so than no goals or “do your best” goals<p class='space'>     But only if feedback is received throughout `, `HRM360-ch6`],
    [`Participative goal setting (vs. assigned goals):`, ``, ``, ``, ``, ``, `<p class='space'>Enhances performance if it causes a person to set difficult goals`, `HRM360-ch6`],
    [`Performance-based goals vs learning-based goals `, ``, ``, ``, ``, ``, `<p class='space'>Performance goals are focused on workplace accomplishments. <p class='space'>Learning goals, meanwhile, center on an employee's desire to improve his skills and abilities to achieve higher levels of performance in the workplace.<p class='space'>Performance-based goals are less effective with complex tasks than are learning-based goals`, `HRM360-ch6`],
    [`Goal setting serves three major functions:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Increase work motivation and thus performance <p class='space'>(2) Reduce role stress (e.g., task conflict, role ambiguity, job overload) <p class='space'>(3) Improve accuracy and validity of performance evaluations `, `HRM360-ch6`],
    [`Commitment to goals can be enhanced by:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Highlighting the importance of the goal: <p class='space'>making commitment public, validation and support from leaders, participative goal-setting, financial compensation<p class='space'>  (2) Boosting an employee’s goal-specific self-efficacy: <p class='space'>Adequate training/development, role-modeling (social learning theory), persuasive/inspirational communication `, `HRM360-ch6`],
    [`Goal commitment`, ``, ``, ``, ``, ``, `<p class='space'>Goals not only need to be set, but employees need to feel committed to those goals; goal commitment enhances the motivating potential of goals `, `HRM360-ch6`],
    [`Performance feedback is CRITICAL for motivating and improving performance; managers should:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Be specific and refer to incidents, facts, and observable behaviors <p class='space'>(2) Focus on changeable behaviors <p class='space'>(3) Plan the session ahead of time (give evaluations ahead of time to let employee prepare) <p class='space'>(4) Balance positive with negative feedback `, `HRM360-ch6`],
    [`PM-Monitoring and Providing Feedback - Three steps to identify and correct performance issues: `, ``, ``, ``, ``, ``, `<p class='space'>(1) Identify the cause of poor performance <p class='space'>     If internal/personal, determine source; <p class='space'>     If external, fix if possible <p class='space'>(3) Develop correction plan`, `HRM360-ch6`],
    [`Managers can attribute performance issues to either internal or external causes by collecting the following information: `, ``, ``, ``, ``, ``, `<p class='space'>Consistency:<p class='space'>Does the behavior always occur?<p class='space'> <p class='space'>Consensus:<p class='space'>Does everyone else exhibit the behavior in that situation?<p class='space'> <p class='space'>Distinctiveness:<p class='space'>Does the person act that was in other situations? `, `HRM360-ch6`],
    [`What is a performance appraisal?`, ``, ``, ``, ``, ``, `<p class='space'>Performance appraisal is the evaluation of performance and serves many functions:<p class='space'>Providing feedback,<p class='space'>Setting developmental goals, <p class='space'>Deciding pay/promotions `, `HRM360-ch6`],
    [`Formal Appraisals and Reviews - Good performance appraisals are:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Valid (many parts of performance), <p class='space'>(2) Reliable (multiple sources), <p class='space'>(3) Responsive to employee input, <p class='space'>(4) Flexible, and <p class='space'>(5) Equitable (fair) `, `HRM360-ch6`],
    [`To help maintain employee motivation long-term:`, ``, ``, ``, ``, ``, `<p class='space'>Managers can provide feedback regularly;<p class='space'>if done consistently, this practice can help maintain employee motivation long-term`, `HRM360-ch6`],
    [`What is Self-efficacy?`, ``, ``, ``, ``, ``, `Self-efficacy is the belief we have in our own abilities, specifically our ability to meet the challenges ahead of us and complete a task successfully (Akhtar, 2008). General self-efficacy refers to our overall belief in our ability to succeed, but there are many more specific forms of self-efficacy as well (e.g., academic, parenting, sports).`, `HRM360-ch6`],
    [`Tuckman’s Five-Stage Model of Group Development`, ``, ``, ``, ``, ``, `<p class='space'>Forming<p class='space'>Storming<p class='space'>Norming<p class='space'>Performing<p class='space'>Adjourning`, `HRM360-ch8`],
    [`Team vs Group`, ``, ``, ``, ``, ``, `<p class='space'>A group is two or more individuals, interacting and interdependent, who have come together to achieve particular objectives <p class='space'>A team is a group composed of members with complementary skills who hold themselves mutually accountable for common goals and performance `, `HRM360-ch8`],
    [`When does a group become a team.`, ``, ``, ``, ``, ``, `<p class='space'>When leadership becomes a shared activity<p class='space'>(1) Accountability shifts from strictly individual to both individual and collective<p class='space'>(2) The group develops its own purpose or mission<p class='space'>(3) Problem solving becomes a way of life<p class='space'>(4) Effectiveness is measured by the groups collective outcomes and products`, `HRM360-ch8`],
    [`Two foundational social processes that maintain team functioning:`, ``, ``, ``, ``, ``, `<p class='space'>Norms: which are attitudes, opinions, feelings, or action patterns that are shared by two or more people, and guide behavior<p class='space'>Roles: a set of expected behaviors for a particular position (or group as a whole); roles are often perceived and are intertwined, which makes them flexible depending on the situation<p class='space'>roles tend to be either task-based or maintenance-based `, `HRM360-ch8`],
    [`Groups and teams form through a number of phases as they resolve ambiguity in these issues:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Interpersonal: trust, personal comfort, security<p class='space'>(2) Task: mission/purpose of group, methods, outcomes expected<p class='space'>(3) Authority; assigning leadership, determining how power is managed. `, `HRM360-ch8`],
    [`Team formation - Forming:`, ``, ``, ``, ``, ``, `<p class='space'>Undefined roles makes people dependent on a leader or initial goals<p class='space'>Little agreement<p class='space'>unclear purpose<p class='space'>(Guidance and direction)`, `HRM360-ch8`],
    [`Team formation - Storming:`, ``, ``, ``, ``, ``, `<p class='space'>Storming: People evaluate each other, conflict, and compete for roles/positions<p class='space'>Conflict<p class='space'>Increased clarity of purpose\(Power struggles, coaching) `, `HRM360-ch8`],
    [`Team formation - Norming:`, ``, ``, ``, ``, ``, `<p class='space'>Norming: Roles/responsibilities become clear and consensually accepted<p class='space'>Agreement and consensus<p class='space'>Clear roles and responsibilies<p class='space'>(Facilitation) `, `HRM360-ch8`],
    [`Team formation - Performing:`, ``, ``, ``, ``, ``, `<p class='space'>Performing: Focus on goal attainment, adaptive and self-correcting\Clear vision and purpose<p class='space'>Focus on goal achievement<p class='space'>(Delegation)`, `HRM360-ch8`],
    [`Team formation - Adjourning:`, ``, ``, ``, ``, ``, `<p class='space'>Adjourning: Team members move on<p class='space'>Good feelings about achievements<p class='space'>(Recognition)`, `HRM360-ch8`],
    [`punctuated equilibrium model `, ``, ``, ``, ``, ``, `<p class='space'>The punctuated equilibrium model finds that groups will spend large periods of time at one stage, and then experience certain key events that rapidly accelerate development before settling on a new baseline group behavior `, `HRM360-ch8`],
    [`Team cohesion`, ``, ``, ``, ``, ``, `<p class='space'>Team cohesion is the strength and extent of interpersonal connection existing among the members of a group. <p class='space'>It is this interpersonal bond that causes members to participate readily and remain motivated to accomplish the set goals. <p class='space'>Cohesive teams have an attitude of “we-ness”<p class='space'>team cohesion, which is attraction among members and a motivation to stay in the team<p class='space'>Cohesion can enhance engagement and team performance,   `, `HRM360-ch8`],
    [`Factors that affect team cohesion:`, ``, ``, ``, ``, ``, `<p class='space'>Small group size, consensus on goals , interaction frequency, status, difficulty to join, intergroup competition, group-based rewards, distance<`, `HRM360-ch8`],
    [`Social Loafing`, ``, ``, ``, ``, ``, `<p class='space'>A primary threat to cohesion is social loafing, which is the tendency for individual effort to decline as group size increases; `, `HRM360-ch8`],
    [`How to reduce the chance of social loafing?`, ``, ``, ``, ``, ``, `<p class='space'>Set group goals (gives common purpose), <p class='space'>peer evaluations, <p class='space'>allows members autonomy in deciding their roles, <p class='space'>identifying/rewarding individuals’ input into a group `, `HRM360-ch8`],
    [`Virtual teams`, ``, ``, ``, ``, ``, `<p class='space'>Virtual teams work together over time and distance via electronic media to combine effort and achieve common goals.<p class='space'> Members of virtual teams report in from different locations, different organizations, and often different time zones and countries.<p class='space'>Advocates say virtual teams are very flexible and efficient because they are driven by information and skills, not by time and location.<p class='space'>`, `HRM360-ch8`],
    [`Best Uses of Virtual Teams:`, ``, ``, ``, ``, ``, `<p class='space'>Virtual teams and distributed workers present many potential benefits:<p class='space'>reduced real estate costs (limited or no office space); <p class='space'>ability to leverage diverse knowledge, skills, and experience across geography and time (you don’t have to have an SAP expert in every office); <p class='space'>ability to share knowledge of diverse markets; <p class='space'>and reduced commuting and travel expenses. <p class='space'>The flexibility often afforded by virtual teams also can reduce work–life conflicts for employees, which some employers contend makes it easier for them to attract and retain talent.`, `HRM360-ch8`],
    [`Obstacles for Virtual Teams`, ``, ``, ``, ``, ``, `<p class='space'>difficult for establish team cohesion<p class='space'>work satisfaction<p class='space'>trust<p class='space'>cooperative behavior,<p class='space'>commitment to team goals. <p class='space'>building team relationships is more difficult when members are geographically distributed.<p class='space'>Members of virtual teams also reported being unable to observe the nonverbal cues of other members and a lack of collegiality.`, `HRM360-ch8`],
    [`Effective Virtual Team Participation and Management`, ``, ``, ``, ``, ``, `<p class='space'>Researchers and consultants agree about one aspect of virtual teams—there is no substitute for face-to-face contact.<p class='space'>Adapt your communications. based on team preferences for e-mail, texts, and phone calls. regularly scheduled calls (via Skype). Don’t just blanket everybody via e-mail—focus your message. Accommodate the different time zones in a fair and consistent manner.  <p class='space'>Share the love. Use technology to keep distributed workers in the loop. Acknowledging birthdays and recognizing accomplishments are especially important for those who are not regularly in the office. use Newsletters as a touch point and vehicle for communicating best practices and success stories.  <p class='space'>Develop productive relationships with key people on the team. This may require extra attention, communication, and travel, Key people are the ones you can lean on and the ones who will make or break the team assignment.  <p class='space'>Be a good partner. if team member is not employee, read them like true partners and not hired help.  <p class='space'>Be available. Managers and remote workers all need to know when people can be reached, where, and how. Let people know and make yourself available.  <p class='space'>Document the work. Allow work to be handed off from one zone to the next. Doing this effectively requires that both senders and receivers clearly specify what they have completed and what they need in each transfer.  <p class='space'>Provide updates. Even if you are not the boss, or your boss doesn’t ask for them, be sure to provide regular updates on your progress to the necessary team members.  <p class='space'>Select the right people. Effective virtual workers generally prefer and do well in interdependent work relationships, tend to be self starters and willing to take initiative. In contrasts with people who prefer to wait for instructions before taking action.  <p class='space'>Use your communication skills. Because so much communication is written, virtual team members must have excellent communication skills and write well in easy-to-understand and to-the-point language.`, `HRM360-ch8`],
    [`Communication is:`, ``, ``, ``, ``, ``, `<p class='space'>Communication is the facilitation of a shared understanding of meaning in the mind of another person `, `HRM360-ch9`],
    [`Communication serves four functions at work:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Exercising control via authority and influence <p class='space'>(2) Eliciting motivation in others <p class='space'>(3) Facilitating emotional expression and support <p class='space'>(4) Providing information for decision making `, `HRM360-ch9`],
    [`Communication - A message has two components: `, ``, ``, ``, ``, ``, `<p class='space'>(1) Cognition: Content in terms of words, ideas, symbols, concepts <p class='space'>(2) Affect: Emotion in terms of intensity, demeanor, gestures, discrete emotions (e.g., anger, joy)<p class='space'>The meaning of these two components to a receiver will vary based on how it travels through the communication process  `, `HRM360-ch9`],
    [`Communication Process - Once encoded, a message is transmitted through:  `, ``, ``, ``, ``, ``, `<p class='space'>One of two types of general channels:<p class='space'>(1) Formal channels that are proscribed by organization’s policies, procedures, and design; this can be vertically upward or downward, and horizontally lateral <p class='space'>(2) Informal channels that are spontaneous, personal (between people), are regardless of anyone’s formal position; these often take the form of gossip or “grapevines” that arise when employees feel uninformed or lied to  `, `HRM360-ch9`],
    [`Communication Process - capacity vs richness `, ``, ``, ``, ``, ``, `<p class='space'>Face to face has the highest richness but the lowest data capacity.<p class='space'>highest to lowest richness<p class='space'>Face-to-face<p class='space'>telephone<p class='space'>e-mail<p class='space'>individualized letter<p class='space'>personalized memo<p class='space'>formal written report<p class='space'>flyer of bulletin<p class='space'>formal numeric report`, `HRM360-ch9`],
    [`Nonverbal Communication `, ``, ``, ``, ``, ``, `<p class='space'>Although most of our communication is verbal (oral or written), between 65-90% of the meaning in a given message is communicated nonverbally <p class='space'>Nonverbal communication is highly sensitive to sender/receiver characteristics, and context `, `HRM360-ch9`],
    [`Four types of nonverbal communication:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Kinesics: Body movement and posture (e.g., clenching fists when stressed, “the finger”, hand-shaking <p class='space'>(2) Face/Eye Behavior: Often reveal emotions, behavioral intentions, and provide cues to the receiver; eye contact and smiling can enhance active listening and empathy <p class='space'>(3) Paralanguage: Variations in speech such as pitch, loudness, tempo, tone, duration, laughing, and crying<p class='space'>(4) Proximity: Physical closeness is an indicator of social/intimate closeness; receivers can be put in intimate, personal (e.g., friends), social, or public “zones”  `, `HRM360-ch9`],
    [`Barriers to communication - perceptual filters `, ``, ``, ``, ``, ``, `<p class='space'>When perceiving communication from others, people have perceptual filters that affect how they experience and react to that communication; these filters can be psychological, experiential, or situational <p class='space'>Examples: Age, gender, values, beliefs, experiences, personality, cultural biases, needs, time pressures, excessive stimulation, moods, etc. `, `HRM360-ch9`],
    [`Barriers to communication - Three common perceptual tendencies: `, ``, ``, ``, ``, ``, `<p class='space'>Selective perception: People tend to notice and accept information that is consistent with their existing beliefs, values, and expectations<p class='space'> <p class='space'>Attribution errors: People tend to either attribute others’ behavior to either external causes (defensive bias) or internal causes (fundamental attribution error), ignoring or downplaying the other<p class='space'> <p class='space'>Self-serving bias: Tendency to attribute our own successes to internal causes, and our own failures to external causes `, `HRM360-ch9`],
    [`Barriers to communication - Other barriers:`, ``, ``, ``, ``, ``, `<p class='space'>Status differences: Intimidated when communicating upward or disinterested when downward <p class='space'>Gender: Different communication styles <p class='space'>Cultural diversity: Some place more importance on authority; many cultures have stereotypes of other cultures that create automatic perception barriers <p class='space'>Language: Cultural language, jargon and professional language can be efficient, but alienating to others `, `HRM360-ch9`],
    [`Active listening is:`, ``, ``, ``, ``, ``, `<p class='space'>Active listening is seeking to fully understand the sender’s intended message, rather than focusing only on one’s response to the message `, `HRM360-ch9`],
    [`Four types of responses facilitate active listening:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Affirming contact: Communicate attentiveness, not necessarily agreement-lets person know your are listening – very non verbal <p class='space'>(2) Paraphrasing: Repeat message back in own words <p class='space'>(3) Clarify the implicit: Verbalize unsaid emotions/thoughts <p class='space'>(4) Reflect core feelings: Identify underlying values empathize at a deeper level  (Not on exam)  `, `HRM360-ch9`],
    [`Ways to improve your active listening skills: `, ``, ``, ``, ``, ``, `<p class='space'>Stop talking <p class='space'>Put the speaker at ease <p class='space'>Show the speaker you want to listen <p class='space'>Remove distractions <p class='space'>Empathize with the speaker <p class='space'>Be patient <p class='space'>Hold your temper <p class='space'>Go easy on criticism <p class='space'>Ask questions, paraphrase, and clarify <p class='space'>Stop talking! Be sure the speaker has finished before you talk`, `HRM360-ch9`],
    [`Assertive communication`, ``, ``, ``, ``, ``, `<p class='space'>Assertive communication: which is direct, clear, informative, respectful.<p class='space'>The key is self-control when communicating:  <p class='space'>Make your statement, then ask for opinions and wait until some have been voiced fully before responding <p class='space'>Minimize self-deprecation (unless being humorous) <p class='space'>Use “I” statements <p class='space'>Judge the behavior, not the person`, `HRM360-ch9`],


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
            console.log(`mQuestions[index][TOPIC]) ${ mQuestions[index][TOPIC]}`);
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