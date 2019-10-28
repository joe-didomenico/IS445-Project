'use strict'
let mPos = 0,
    mTest, mTest_status, mQuestion, mChoice, mChoices, mCha, mChB, mChC, mChD, mCorrect = 0;
let mSkipped = 0;
// buttons-panel is the control panel    
let buttonPanel = document.getElementById('button-panel');
let arryTopics = [];
const TOPIC = 7; // answer is in position 5 of the array

let flagShuffle = false;

let mStrResult = '<p>Notes to repeat:<p>';

let arrMissedQuestions = [];

let mQuestions = [];
const mQuestionsAll = [

    [`What is performance management?`, ``, ``, ``, ``, ``, `<p class='space'>Performance management (PM) is a set of processes and managerial behaviors that include:<p class='space'>(1) Defining<p class='space'>(2) Monitoring and evaluate performance <p class='space'>(3) Review Performance<p class='space'>(4) Providing consequences for performance expectations.`, `HRM360-CH06`],
    [`Four steps of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance.  <p class='space'>Step 2: Monitoring and evaluating performance.  <p class='space'>Step 3: Reviewing performance.  <p class='space'>Step 4: Providing consequences.`, `HRM360-CH06`],
    [`Three issues with performance management:`, ``, ``, ``, ``, ``, `<p class='space'>(1) performance management practices are often obsolete.<p class='space'>(2) performance management is time consuming.<p class='space'>(3) performance reviews are too narrow.`, `HRM360-CH06`],
    [`Coaching is: `, ``, ``, ``, ``, ``, `<p class='space'> A customized process between two or more people with the intent of enhancing learning and motivating change`, `HRM360-CH06`],
    [`Two theories used in terms of learning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Classical conditioning<p class='space'> Modifies behavior by pairing an unconditioned stimulus with a conditioned stimulus in order to elicit an unconditioned response<p class='space'>(2) Operant conditioning<p class='space'> Modifies behavior by following it with positive or negative consequences - Operant conditioning proposes that behavior can be modified by changing its consequences `, `HRM360-CH06`],
    [`Three components of operant conditioning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) A stimulus in the environment cues attention to a behavior<p class='space'>(2) Behavior occurs in response to a stimulus<p class='space'>(3) Outcomes are the consequences of our behavior<p class='space'>Example:<p class='space'>Starts with a stimuli - Boss says get report to me by Friday<p class='space'>Followed by a response - report is delivered by Friday<p class='space'>Then finally an outcome which is the consequence of the behavior - Boss says great job.<p class='space'>Next time you are more likely to get report in on time.`, `HRM360-CH06`],
    [`Learning - Reinforcement: (Keep doing something)`, ``, ``, ``, ``, ``, `<p class='space'>Makes you keep doing something<p class='space'>Enhances desirable behavior by giving positive consequences, or withholding negative ones<p class='space'>Positive reinforcers - thanking employee - pay increases - promotion<p class='space'>Negative reinforcers -  remove probationary period, removal a negative situation - reassign`, `HRM360-CH06`],
    [`Learning - Extinction`, ``, ``, ``, ``, ``, `<p class='space'>Weakening a behavior by ignoring it or making sure it is not reinforced is referred to as extinction<p class='space'>Attaching no consequence to an undesired behavior; this may be the most effective when used alongside positive reinforcement (for desired behaviors)<p class='space'>Only works if the behavior isn't intrinsically enjoyable to them (if so punishment will be required.)`, `HRM360-CH06`],
    [`Learning - Punishment (stop a behavior)`, ``, ``, ``, ``, ``, `<p class='space'>Get you to stop doing something<p class='space'>Discourage undesirable behaviors by giving negative consequences or withholding positive consequences`, `HRM360-CH06`],
    [`Learning - Desired behaviors `, ``, ``, ``, ``, ``, `<p class='space'>Positive reinforcement (give positive consequences)<p class='space'> Negative reinforcement (withhold negative consequences)  `, `HRM360-CH06`],
    [`Learning - Undesired behaviors  `, ``, ``, ``, ``, ``, `<p class='space'>Extinction (Weakening a behavior by ignoring it or making sure it is not reinforced is referred to as extinction)<p class='space'>Punishment (give negative consequences or  withhold positive consequences)  `, `HRM360-CH06`],
    [`What is Social Learning Theory?`, ``, ``, ``, ``, ``, `<p class='space'>Social learning theory asserts that people observe others, and the reinforcement applied to them for their behavior. Others will be motivated  to model their behavior accordingly if the reinforcement is appealing; <p class='space'>Learning is enhanced when learners have high task-specific self-efficacy (which means they believe they can do something)`, `HRM360-CH06`],
    [`What are the sources of self-efficacy?`, ``, ``, ``, ``, ``, `<p class='space'>Successful past performance<p class='space'>Vicarious experience - (seeing others like us successfully completing similar work)  <p class='space'>Verbal persuasion (coaching, displaying confidence) `, `HRM360-CH06`],
    [`Performance Management`, ``, ``, ``, ``, ``, `<p class='space'>Performance management is a set of processes and managerial behaviors that include defining, monitoring, evaluating, and providing consequences for performance expectations<p class='space'>Through performance management, we can regulate what employees learn and direct that learning towards completing job tasks `, `HRM360-CH06`],
    [`Four steps of performance management:`, ``, ``, ``, ``, ``, `<p class='space'>Step 1: Defining performance. Set goals, communicate expectations<p class='space'>Step 2: Monitoring and evaluating performance. Measure and evaluate progress and outcomes. <p class='space'>Step 3: Reviewing performance. Deliver feedback and coaching. <p class='space'>Step 4: Providing consequences. Administer valued rewards and appropriate punishment.`, `HRM360-CH06`],
    [`Smart Goals`, ``, ``, ``, ``, ``, `<p class='space'>Smart - an acronym for: <p class='space'>Specific<p class='space'>Measurable<p class='space'>Attainable<p class='space'>Results oriented/Relevant<p class='space'>Time bound`, `HRM360-CH06`],
    [`Performance Management - There are two general categories of performance behavior:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Task performance: <p class='space'>Work-related tasks/goals (e.g., financial goals, administrative tasks, production, etc.)<p class='space'> (2) Contextual performance: (OCB)<p class='space'>Support the social environment (e.g., helping, cooperating, providing social support) – (organizational citizenship behavior) `, `HRM360-CH06`],
    [`Differences between  task and contextual performance`, ``, ``, ``, ``, ``, `<p class='space'>Task performance is often clearly defined.<p class='space'>Contextual performance is typically discretionary and not a mandatory part of an employee’s job.`, `HRM360-CH06`],
    [`The process of establishing desired results that guide and direct behavior`, ``, ``, ``, ``, ``, `<p class='space'>Goal-setting`, `HRM360-CH06`],
    [`Goals affect performance through four routes:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Directing attention towards goal-relevant activities<p class='space'>(2) Energizing people towards activity and behavior<p class='space'>(3) Encouraging persistence when possible<p class='space'>(4) Eliciting the use or learning (when needed) of task-relevant knowledge and strategies `, `HRM360-CH06`],
    [`Difficult (but not impossible) and specific goals can:`, ``, ``, ``, ``, ``, `<p class='space'>Enhance performance<p class='space'>     More so than no goals or “do your best” goals<p class='space'>     But only if feedback is received throughout `, `HRM360-CH06`],
    [`Participative goal setting (vs. assigned goals):`, ``, ``, ``, ``, ``, `<p class='space'>Enhances performance if it causes a person to set difficult goals`, `HRM360-CH06`],
    [`Performance-based goals vs learning-based goals `, ``, ``, ``, ``, ``, `<p class='space'>Performance goals are focused on workplace accomplishments. <p class='space'>Learning goals, meanwhile, center on an employee's desire to improve his skills and abilities to achieve higher levels of performance in the workplace.<p class='space'>Performance-based goals are less effective with complex tasks than are learning-based goals`, `HRM360-CH06`],
    [`Goal setting serves three major functions:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Increase work motivation and thus performance <p class='space'>(2) Reduce role stress (e.g., task conflict, role ambiguity, job overload) <p class='space'>(3) Improve accuracy and validity of performance evaluations `, `HRM360-CH06`],
    [`Commitment to goals can be enhanced by two things:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Highlighting the importance of the goal: <p class='space'>making commitment public, validation and support from leaders, participative goal-setting, financial compensation<p class='space'>  (2) Boosting an employee’s goal-specific self-efficacy: <p class='space'>Adequate training/development, role-modeling (social learning theory), persuasive/inspirational communication `, `HRM360-CH06`],
    [`Goal commitment`, ``, ``, ``, ``, ``, `<p class='space'>Goals not only need to be set, but employees need to feel committed to those goals; goal commitment enhances the motivating potential of goals `, `HRM360-CH06`],
    [`Performance feedback is CRITICAL for motivating and improving performance; managers should:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Be specific and refer to incidents, facts, and observable behaviors <p class='space'>(2) Focus on changeable behaviors <p class='space'>(3) Plan the session ahead of time (give evaluations ahead of time to let employee prepare) <p class='space'>(4) Balance positive with negative feedback `, `HRM360-CH06`],
    [`PM-Monitoring and Providing Feedback - Three steps to identify and correct performance issues: `, ``, ``, ``, ``, ``, `<p class='space'>(1) Identify the cause of poor performance <p class='space'>     If internal/personal, determine source; <p class='space'>     If external, fix if possible <p class='space'>(3) Develop correction plan`, `HRM360-CH06`],
    [`Managers can attribute performance issues to either internal or external causes by collecting the following information: `, ``, ``, ``, ``, ``, `<p class='space'>Consistency:<p class='space'>Does the behavior always occur?<p class='space'> <p class='space'>Consensus:<p class='space'>Does everyone else exhibit the behavior in that situation?<p class='space'> <p class='space'>Distinctiveness:<p class='space'>Does the person act that was in other situations? `, `HRM360-CH06`],
    [`What is a performance appraisal?`, ``, ``, ``, ``, ``, `<p class='space'>Performance appraisal is the evaluation of performance and serves many functions:<p class='space'>Providing feedback,<p class='space'>Setting developmental goals, <p class='space'>Deciding pay/promotions `, `HRM360-CH06`],
    [`Formal Appraisals and Reviews - Good performance appraisals are:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Valid (many parts of performance), <p class='space'>(2) Reliable (multiple sources), <p class='space'>(3) Responsive to employee input, <p class='space'>(4) Flexible, and <p class='space'>(5) Equitable (fair) `, `HRM360-CH06`],
    [`To help maintain employee motivation long-term:`, ``, ``, ``, ``, ``, `<p class='space'>Managers can provide feedback regularly;<p class='space'>if done consistently, this practice can help maintain employee motivation long-term`, `HRM360-CH06`],
    [`What is Self-efficacy?`, ``, ``, ``, ``, ``, `Self-efficacy is the belief we have in our own abilities, specifically our ability to meet the challenges ahead of us and complete a task successfully (Akhtar, 2008). General self-efficacy refers to our overall belief in our ability to succeed, but there are many more specific forms of self-efficacy as well (e.g., academic, parenting, sports).`, `HRM360-CH06`],
    [`What is learning?`, ``, ``, ``, ``, ``, `<p class='space'>Learning is a relatively enduring change<p class='space'>Learning is a relatively permanent change in behavior acquired through practice or experience<p class='space'> Learning is taking and linking different concepts together<p class='space'>`, `HRM360-CH06`],
    [`Two ways to initiate learning:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Give knowledge that leads to change<p class='space'>(2) Alter consequences of behavior `, `HRM360-CH06`],
    [`Conditioning`, ``, ``, ``, ``, ``, `<p class='space'> Operant conditioning, (used by organizations) instrumental conditioning. a process of changing behavior by rewarding or punishing a subject each time an action is performed until the subject associates the action with pleasure or distress.<p class='space'>Classical conditioning, Pavlovian conditioning, respondent conditioning. a process in which a stimulus that was previously neutral, as the sound of a bell, comes to evoke a particular response, as salivation, by being repeatedly paired with another stimulus that normally evokes the response, as the taste of food.`, `HRM360-CH06`],
    [`Setting goals together -`, ``, ``, ``, ``, ``, `<p class='space'>Will more likely develop more difficult goals.`, `HRM360-CH06`],
    [`When telling someone not to do something you must:`, ``, ``, ``, ``, ``, `<p class='space'>Tell them what they should be doing.`, `HRM360-CH06`],
    [`Harold Kelley's covariation model (1967, 1971, 1972, 1973)[1] is an attribution theory`, ``, ``, ``, ``, ``, `<p class='space'>Consensus is the co-variation of behavior across different people. If lots of people find Lisa attractive, consensus is high. If only Arnold finds Lisa attractive, consensus is low. High consensus is attributed to the stimulus (in the above example, to Lisa), while low consensus is attributed to the person (in this case, Arnold). <p class='space'>Distinctiveness refers to how unique the behavior is to the particular situation. There is a low distinctiveness if an individual behaves similarly in all situations, and there exists a high distinctiveness when the person only shows the behavior in particular situations. If the distinctiveness is high, one will attribute this behavior more to the circumstance instead of person<p class='space'>Consistency is the covariation of behavior across time. If Jane is generous all the time, she shows high consistency. If Jane is rarely generous or is generous only at specific times, perhaps around the holidays, she shows low consistency. High consistency is attributed to the person (Jane is a generous person), while low consistency is attributed to the circumstance (the holidays make people generous). `, `HRM360-CH06`],
    [`Making attributions using consensus, distinctiveness, and consistency`, ``, ``, ``, ``, ``, `<p class='space'>Low Consensus, Low Distinctiveness, High Consistency = Personal Attribution<p class='space'> High Consensus, High Distinctiveness, High Consistency = Stimulus Attribution<p class='space'> High Consensus, Low Distinctiveness, Low Consistency = Circumstance Attribution `, `HRM360-CH06`],
    [`The law of effect`, ``, ``, ``, ``, ``, `<p class='space'>The law of effect says behavior with favorable consequences tends to be repeated, while behavior with unfavorable consequences tends to disappear.`, `HRM360-CH06book`],
    [`Continuous reinforcement CRF`, ``, ``, ``, ``, ``, `<p class='space'>If every instance of a target behavior is reinforced, then a continuous reinforcement (CRF) schedule is in effect. For instance, if you get paid every time you make a sale, this is a CRF schedule. <p class='space'>The sale is the desired behavior and payment is the reinforcement. <p class='space'>CRF is especially useful for making early links between desired behaviors and outcomes, but they are susceptible to perceptions of entitlement and rapid extinction if the link is broken.`, `HRM360-CH06book`],
    [`Intermittent Reinforcement,`, ``, ``, ``, ``, ``, `<p class='space'>Unlike CRF schedules, intermittent reinforcement consists of reinforcement of some but not all instances of a target behavior.<p class='space'>There are four subcategories of intermittent schedules.<p class='space'>Fixed ratio -  Piece-rate pay; bonuses tied to the sale of a fixed number of units<p class='space'> Variable ratio -  Slot machines that pay after a variable number of pulls; l<p class='space'>Fixed interval -  Paychecks (every two weeks or once a month); annual bonuses; probationary periods  <p class='space'>Variable interval - Random supervisor “pats on the back”; spot rewards;`, `HRM360-CH06book`],
    [`Tuckman’s Five-Stage Model of Group Development`, ``, ``, ``, ``, ``, `<p class='space'>Forming<p class='space'>Storming<p class='space'>Norming<p class='space'>Performing<p class='space'>Adjourning`, `HRM360-CH08`],
    [`Team vs Group`, ``, ``, ``, ``, ``, `<p class='space'>A group is two or more individuals, interacting and interdependent, who have come together to achieve particular objectives <p class='space'>A team is a group composed of members with complementary skills who hold themselves mutually accountable for common goals and performance `, `HRM360-CH08`],
    [`When does a group become a team.`, ``, ``, ``, ``, ``, `<p class='space'>When leadership becomes a shared activity<p class='space'>(1) Accountability shifts from strictly individual to both individual and collective<p class='space'>(2) The group develops its own purpose or mission<p class='space'>(3) Problem solving becomes a way of life<p class='space'>(4) Effectiveness is measured by the groups collective outcomes and products`, `HRM360-CH08`],
    [`Two foundational social processes that maintain team functioning:`, ``, ``, ``, ``, ``, `<p class='space'>Norms: which are attitudes, opinions, feelings, or action patterns that are shared by two or more people, and guide behavior<p class='space'>Roles: a set of expected behaviors for a particular position (or group as a whole); roles are often perceived and are intertwined, which makes them flexible depending on the situation<p class='space'>roles tend to be either task-based or maintenance-based `, `HRM360-CH08`],
    [`Groups and teams form through a number of phases as they resolve ambiguity in these issues:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Interpersonal: trust, personal comfort, security<p class='space'>(2) Task: mission/purpose of group, methods, outcomes expected<p class='space'>(3) Authority; assigning leadership, determining how power is managed. `, `HRM360-CH08`],
    [`Team formation - Forming:`, ``, ``, ``, ``, ``, `<p class='space'>Undefined roles makes people dependent on a leader or initial goals<p class='space'>Little agreement<p class='space'>unclear purpose<p class='space'>(Guidance and direction)`, `HRM360-CH08`],
    [`Team formation - Storming:`, ``, ``, ``, ``, ``, `<p class='space'>Storming: People evaluate each other, conflict, and compete for roles/positions<p class='space'>Conflict<p class='space'>Increased clarity of purpose\(Power struggles, coaching) `, `HRM360-CH08`],
    [`Team formation - Norming:`, ``, ``, ``, ``, ``, `<p class='space'>Norming: Roles/responsibilities become clear and consensually accepted<p class='space'>Agreement and consensus<p class='space'>Clear roles and responsibilities<p class='space'>(Facilitation) `, `HRM360-CH08`],
    [`Team formation - Performing:`, ``, ``, ``, ``, ``, `<p class='space'>Performing: Focus on goal attainment, adaptive and self-correcting\Clear vision and purpose<p class='space'>Focus on goal achievement<p class='space'>(Delegation)`, `HRM360-CH08`],
    [`Team formation - Adjourning:`, ``, ``, ``, ``, ``, `<p class='space'>Adjourning: Team members move on<p class='space'>Good feelings about achievements<p class='space'>(Recognition)`, `HRM360-CH08`],
    [`punctuated equilibrium model `, ``, ``, ``, ``, ``, `<p class='space'>The punctuated equilibrium model finds that groups will spend large periods of time at one stage, and then experience certain key events that rapidly accelerate development before settling on a new baseline group behavior `, `HRM360-CH08`],
    [`Team cohesion`, ``, ``, ``, ``, ``, `<p class='space'>Team cohesion is the strength and extent of interpersonal connection existing among the members of a group. <p class='space'>It is this interpersonal bond that causes members to participate readily and remain motivated to accomplish the set goals. <p class='space'>Cohesive teams have an attitude of “we-ness”<p class='space'>team cohesion, which is attraction among members and a motivation to stay in the team<p class='space'>Cohesion can enhance engagement and team performance,   `, `HRM360-CH08`],
    [`Factors that affect team cohesion:`, ``, ``, ``, ``, ``, `<p class='space'>Small group size, consensus on goals , interaction frequency, status, difficulty to join, intergroup competition, group-based rewards, distance<`, `HRM360-CH08`],
    [`Social Loafing`, ``, ``, ``, ``, ``, `<p class='space'>A primary threat to cohesion is social loafing, which is the tendency for individual effort to decline as group size increases; `, `HRM360-CH08`],
    [`How to reduce the chance of social loafing?`, ``, ``, ``, ``, ``, `<p class='space'>Set group goals (gives common purpose), <p class='space'>peer evaluations, <p class='space'>allows members autonomy in deciding their roles, <p class='space'>identifying/rewarding individuals’ input into a group `, `HRM360-CH08`],
    [`Virtual teams`, ``, ``, ``, ``, ``, `<p class='space'>Virtual teams work together over time and distance via electronic media to combine effort and achieve common goals.<p class='space'> Members of virtual teams report in from different locations, different organizations, and often different time zones and countries.<p class='space'>Advocates say virtual teams are very flexible and efficient because they are driven by information and skills, not by time and location.<p class='space'>`, `HRM360-CH08`],
    [`Best Uses of Virtual Teams:`, ``, ``, ``, ``, ``, `<p class='space'>Virtual teams and distributed workers present many potential benefits:<p class='space'>reduced real estate costs (limited or no office space); <p class='space'>ability to leverage diverse knowledge, skills, and experience across geography and time (you don’t have to have an SAP expert in every office); <p class='space'>ability to share knowledge of diverse markets; <p class='space'>and reduced commuting and travel expenses. <p class='space'>The flexibility often afforded by virtual teams also can reduce work–life conflicts for employees, which some employers contend makes it easier for them to attract and retain talent.`, `HRM360-CH08`],
    [`Obstacles for Virtual Teams`, ``, ``, ``, ``, ``, `<p class='space'>difficult for establish team cohesion<p class='space'>work satisfaction<p class='space'>trust<p class='space'>cooperative behavior,<p class='space'>commitment to team goals. <p class='space'>building team relationships is more difficult when members are geographically distributed.<p class='space'>Members of virtual teams also reported being unable to observe the nonverbal cues of other members and a lack of collegiality.`, `HRM360-CH08`],
    [`Effective Virtual Team Participation and Management`, ``, ``, ``, ``, ``, `<p class='space'>Researchers and consultants agree about one aspect of virtual teams—there is no substitute for face-to-face contact.<p class='space'>Adapt your communications. based on team preferences for e-mail, texts, and phone calls. regularly scheduled calls (via Skype). Don’t just blanket everybody via e-mail—focus your message. Accommodate the different time zones in a fair and consistent manner.  <p class='space'>Share the love. Use technology to keep distributed workers in the loop. Acknowledging birthdays and recognizing accomplishments are especially important for those who are not regularly in the office. use Newsletters as a touch point and vehicle for communicating best practices and success stories.  <p class='space'>Develop productive relationships with key people on the team. This may require extra attention, communication, and travel, Key people are the ones you can lean on and the ones who will make or break the team assignment.  <p class='space'>Be a good partner. if team member is not employee, read them like true partners and not hired help.  <p class='space'>Be available. Managers and remote workers all need to know when people can be reached, where, and how. Let people know and make yourself available.  <p class='space'>Document the work. Allow work to be handed off from one zone to the next. Doing this effectively requires that both senders and receivers clearly specify what they have completed and what they need in each transfer.  <p class='space'>Provide updates. Even if you are not the boss, or your boss doesn’t ask for them, be sure to provide regular updates on your progress to the necessary team members.  <p class='space'>Select the right people. Effective virtual workers generally prefer and do well in interdependent work relationships, tend to be self starters and willing to take initiative. In contrasts with people who prefer to wait for instructions before taking action.  <p class='space'>Use your communication skills. Because so much communication is written, virtual team members must have excellent communication skills and write well in easy-to-understand and to-the-point language.`, `HRM360-CH08`],
    [`Communication is:`, ``, ``, ``, ``, ``, `<p class='space'>Communication is the facilitation of a shared understanding of meaning in the mind of another person `, `HRM360-CH09`],
    [`Communication serves four functions at work:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Exercising control via authority and influence <p class='space'>(2) Eliciting motivation in others <p class='space'>(3) Facilitating emotional expression and support <p class='space'>(4) Providing information for decision making `, `HRM360-CH09`],
    [`Communication - A message has two components: `, ``, ``, ``, ``, ``, `<p class='space'>(1) Cognition: Content in terms of words, ideas, symbols, concepts <p class='space'>(2) Affect: Emotion in terms of intensity, demeanor, gestures, discrete emotions (e.g., anger, joy)<p class='space'>The meaning of these two components to a receiver will vary based on how it travels through the communication process  `, `HRM360-CH09`],
    [`Communication Process - Once encoded, a message is transmitted through:  `, ``, ``, ``, ``, ``, `<p class='space'>One of two types of general channels:<p class='space'>(1) Formal channels that are proscribed by organization’s policies, procedures, and design; this can be vertically upward or downward, and horizontally lateral <p class='space'>(2) Informal channels that are spontaneous, personal (between people), are regardless of anyone’s formal position; these often take the form of gossip or “grapevines” that arise when employees feel uninformed or lied to  `, `HRM360-CH09`],
    [`Communication Process - capacity vs richness `, ``, ``, ``, ``, ``, `<p class='space'>Face to face has the highest richness but the lowest data capacity.<p class='space'>highest to lowest richness<p class='space'>Face-to-face<p class='space'>telephone<p class='space'>e-mail<p class='space'>individualized letter<p class='space'>personalized memo<p class='space'>formal written report<p class='space'>flyer of bulletin<p class='space'>formal numeric report`, `HRM360-CH09`],
    [`Nonverbal Communication `, ``, ``, ``, ``, ``, `<p class='space'>Although most of our communication is verbal (oral or written), between 65-90% of the meaning in a given message is communicated nonverbally <p class='space'>Nonverbal communication is highly sensitive to sender/receiver characteristics, and context `, `HRM360-CH09`],
    [`Four types of nonverbal communication:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Kinesics: Body movement and posture (e.g., clenching fists when stressed, “the finger”, hand-shaking <p class='space'>(2) Face/Eye Behavior: Often reveal emotions, behavioral intentions, and provide cues to the receiver; eye contact and smiling can enhance active listening and empathy <p class='space'>(3) Paralanguage: Variations in speech such as pitch, loudness, tempo, tone, duration, laughing, and crying<p class='space'>(4) Proximity: Physical closeness is an indicator of social/intimate closeness; receivers can be put in intimate, personal (e.g., friends), social, or public “zones”  `, `HRM360-CH09`],
    [`Barriers to communication - perceptual filters `, ``, ``, ``, ``, ``, `<p class='space'>When perceiving communication from others, people have perceptual filters that affect how they experience and react to that communication; these filters can be psychological, experiential, or situational <p class='space'>Examples: Age, gender, values, beliefs, experiences, personality, cultural biases, needs, time pressures, excessive stimulation, moods, etc. `, `HRM360-CH09`],
    [`Barriers to communication - Three common perceptual tendencies: `, ``, ``, ``, ``, ``, `<p class='space'>Selective perception: People tend to notice and accept information that is consistent with their existing beliefs, values, and expectations<p class='space'> <p class='space'>Attribution errors: People tend to either attribute others’ behavior to either external causes (defensive bias) or internal causes (fundamental attribution error), ignoring or downplaying the other<p class='space'> <p class='space'>Self-serving bias: Tendency to attribute our own successes to internal causes, and our own failures to external causes `, `HRM360-CH09`],
    [`Barriers to communication - Other barriers:`, ``, ``, ``, ``, ``, `<p class='space'>Status differences: Intimidated when communicating upward or disinterested when downward <p class='space'>Gender: Different communication styles <p class='space'>Cultural diversity: Some place more importance on authority; many cultures have stereotypes of other cultures that create automatic perception barriers <p class='space'>Language: Cultural language, jargon and professional language can be efficient, but alienating to others `, `HRM360-CH09`],
    [`Active listening is:`, ``, ``, ``, ``, ``, `<p class='space'>Active listening is seeking to fully understand the sender’s intended message, rather than focusing only on one’s response to the message `, `HRM360-CH09`],
    [`Four types of responses facilitate active listening:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Affirming contact: Communicate attentiveness, not necessarily agreement-lets person know your are listening – very non verbal <p class='space'>(2) Paraphrasing: Repeat message back in own words <p class='space'>(3) Clarify the implicit: Verbalize unsaid emotions/thoughts <p class='space'>(4) Reflect core feelings: Identify underlying values empathize at a deeper level  (Not on exam)  `, `HRM360-CH09`],
    [`Ways to improve your active listening skills: `, ``, ``, ``, ``, ``, `<p class='space'>Stop talking <p class='space'>Put the speaker at ease <p class='space'>Show the speaker you want to listen <p class='space'>Remove distractions <p class='space'>Empathize with the speaker <p class='space'>Be patient <p class='space'>Hold your temper <p class='space'>Go easy on criticism <p class='space'>Ask questions, paraphrase, and clarify <p class='space'>Stop talking! Be sure the speaker has finished before you talk`, `HRM360-CH09`],
    [`Assertive communication`, ``, ``, ``, ``, ``, `<p class='space'>Assertive communication: which is direct, clear, informative, respectful.<p class='space'>The key is self-control when communicating:  <p class='space'>Make your statement, then ask for opinions and wait until some have been voiced fully before responding <p class='space'>Minimize self-deprecation (unless being humorous) <p class='space'>Use “I” statements <p class='space'>Judge the behavior, not the person`, `HRM360-CH09`],
    [`Decision-making two types:`, ``, ``, ``, ``, ``, `<p class='space'>(1) Programmatic decisions are routine and based on established decision rules (most decisions programmatic)<p class='space'>(2) Non-programmatic decisions require creative solutions – requires conscious deliberations`, `HRM360-CH11`],
    [`Rational decision-making - six steps:`, ``, ``, ``, ``, ``, `<p class='space'>Rational decision-making is a systematic process of defining problems, evaluating alternatives, and choosing optimal solutions<p class='space'>(1) Define the problem <p class='space'>(2) Identify decision criteria (standards to be met) <p class='space'>(3) Weight the criteria in terms of value/importance <p class='space'>(4) Generate alternative courses of action <p class='space'>(5) Evaluate each alternative against each criterion <p class='space'>(6) Compute the optimal decision `, `HRM360-CH11`],
    [`Rational decision model strengths/weaknesses: `, ``, ``, ``, ``, ``, `<p class='space'>Strengths:<p class='space'> Careful – thoughtful -encourages deliberation, avoids jumping into first accessible conclusion <p class='space'>Weaknesses:<p class='space'> Takes time, limits to human information processing,  requires a lot of data/info, may change weight of alternatives retroactively `, `HRM360-CH11`],
    [`Rational decision model assumptions:`, ``, ``, ``, ``, ``, `<p class='space'>The rational model assumes: <p class='space'>(1) The outcome will be rational (not emotional or unpredicted) <p class='space'>(2) The decision maker has a consistent set of preferences <p class='space'>(3) The decision maker is aware of all possible alternatives <p class='space'>(4) The decision maker can calculate probability of success for each alternative `, `HRM360-CH11`],
    [`Bounded Rationality`, ``, ``, ``, ``, ``, `<p class='space'>When making decisions, people are limited by their cognitive ability and group processes <p class='space'>The bounded rationality model recognizes that most people/groups make decisions by constructing simplified models that extract the essential features from problems without capturing all their complexity<p class='space'>Bounded rationality is the idea that we make decisions that are rational, but within the limits of the information available to us and our mental capabilities.<p class='space'>Economists who think of us as ‘boundedly rational’ don’t see us as an ‘economic superman’, or homo economics that spends his life optimizing the happiness created by every decision. <p class='space'>Instead, they see us as satisficers — as people who choose the option that will satisfy their needs and wants without putting too much effort into making sure they’ve considering every single possibility.`, `HRM360-CH11`],
    [`Bounded Rationality - Assumptions:`, ``, ``, ``, ``, ``, `<p class='space'>Bounded rationality assumes people: <p class='space'>(1) Select the first satisfactory alternative (satisficing) because costs (time, effort) are too high to optimize the decision <p class='space'>(2) Recognize that their conception of the world is simple <p class='space'>(3) Are comfortable making decisions without determining all the alternatives <p class='space'>(4) Make decisions by “rules of thumb” or heuristics because they save mental energy. `, `HRM360-CH11`],
    [`Heuristics `, ``, ``, ``, ``, ``, `<p class='space'>A heuristic technique is any approach to problem solving or self-discovery that employs a practical method that is not guaranteed to be optimal, perfect or rational, but which is nevertheless sufficient for reaching an immediate, short-term goal.<p class='space'>Where finding an optimal solution is impossible or impractical, heuristic methods can be used to speed up the process of finding a satisfactory solution.`, `HRM360-CH11`],
    [`Heuristics - Examples:`, ``, ``, ``, ``, ``, `<p class='space'>Examples that employ heuristics include using:<p class='space'> trial and error<p class='space'> a rule of thumb<p class='space'> an educated guess<p class='space'> an intuitive judgment<p class='space'> a guesstimate<p class='space'> profiling<p class='space'> common sense. `, `HRM360-CH11`],
    [`Heuristics and biases:`, ``, ``, ``, ``, ``, `<p class='space'>Reliance on heuristics, impulses, and even intuition (where not well-honed), can lead to biases:<p class='space'><p class='space'>(1)  Overconfidence in one’s personal judgment/cognition <p class='space'>(2)  Anchoring decisions based on initial information <p class='space'>(3)  Seeking/accepting information that offers confirmation of our past or present experiences  <p class='space'>(4)  Base judgments on readily available information <p class='space'>(5)  Believing we can predict the outcomes of randomness <p class='space'>(6) Believing in hindsight that one was accurate  `, `HRM360-CH11`],
    [`What is Satisficing?`, ``, ``, ``, ``, ``, `<p class='space'>Selecting the first satisfactory alternative - because costs (time, effort) are too high to optimize the decision<p class='space'>Satisficing is a decision-making strategy that aims for a satisfactory or adequate result, rather than the optimal solution. Instead of putting maximum exertion toward attaining the ideal outcome, satisficing focuses on pragmatic effort when confronted with tasks.<p class='space'>This is because aiming for the optimal solution may necessitate a needless expenditure of time, energy, and resources.`, `HRM360-CH11`],
    [`What is the Framing Effect?`, ``, ``, ``, ``, ``, `<p class='space'>The Framing effect is the principle that our choices are influenced by the way they are framed through different wordings, settings, and situations. <p class='space'>How does it happen? <p class='space'>Which one of these products would you pick: <p class='space'>A ‘95% effective’ condom or a ‘5% failure’ condom? <p class='space'>‘80% lean’ ground beef or ‘20%’ fat ground beef? <p class='space'><p class='space'>Most people would be more likely to choose the first option in both cases, even though the two choices are identical.`, `HRM360-CH11`],
    [`Escalation of commitment - aka Commitment Bias`, ``, ``, ``, ``, ``, `<p class='space'>Escalation of commitment - aka Commitment Bias, is the tendency to continue supporting a decision (or series of decisions) even though it is failing to reach the desired goal.  <p class='space'>Reasons for escalation of commitment from the slides: Cognitive dissonance, optimism, desire for control, low self-esteem, lack of affirmation for other ideas. <p class='space'>Escalation of commitment is a human behavior pattern in which an individual or group facing increasingly negative outcomes from a decision, action, or investment nevertheless continues the behavior instead of altering course.<p class='space'>As a byproduct of confirmation bias, we rarely seek out disconfirming evidence of what we believe. Instead, we tend to interpret evidence in a way that makes our past ideas seem better than they truly were. When we only seek out favorable evidence, it becomes easier to maintain our positive self-image.<p class='space'>Similar to sunk cost fallacy: Individuals commit the sunk cost fallacy when they continue a behavior or endeavor as a result of previously invested resources (time, money or effort) (Arkes & Blumer, 1985). This fallacy, which is related to loss aversion and status quo bias, can also be viewed as bias resulting from an ongoing commitment.`, `HRM360-CH11`],
    [`What can be done to manage these decision-making biases and individual differences?`, ``, ``, ``, ``, ``, `<p class='space'>(1) Having access to accurate information sources <p class='space'>(2) Comprehensive strategizing and goal-setting <p class='space'>(3) Seeking dis-confirmation of initial conclusions, and generating further alternatives <p class='space'>(4) Having others review one’s reasoning `, `HRM360-CH11`],
    [`Group Decisions - Advantages and Disadvantages`, ``, ``, ``, ``, ``, `<p class='space'>Advantages:<p class='space'>(1) More knowledge by pooling member resources <p class='space'>(2) Increased commitment to decisions <p class='space'>(3) Greater understanding of the decision<p class='space'>Disadvantages<p class='space'>(1) Pressure for conformity (groupthink) <p class='space'>(2) Domination by forceful members <p class='space'>(3) Time and organization requirements  `, `HRM360-CH11`],
    [`Groupthink, what is it?`, ``, ``, ``, ``, ``, `<p class='space'>Groupthink is the practice of thinking or making decisions as a group in a way that discourages creativity or individual responsibility.<p class='space'>Strong group cohesion will lead to groupthink: <p class='space'>If structural faults exist: insulation, homogeneity of backgrounds, shared mindsets, the group normatively uses directive leadership <p class='space'>If a high pressure context is present: stress from external threats, low self-esteem from recent failures, time pressure, perceptions of task difficulty, important task `, `HRM360-CH11`],
    [`How can groupthink be reduced? `, ``, ``, ``, ``, ``, `<p class='space'>Create subgroups, <p class='space'>outside experts, <p class='space'>appoint devil’s advocate, <p class='space'>rethink position once consensus is reached `, `HRM360-CH11`],
    [`Groupthink notes:`, ``, ``, ``, ``, ``, `<p class='space'>Groupthink is not totally accurate:<p class='space'>Group cohesion does not necessarily precede groupthink since…<p class='space'> … directive leadership by itself leads to the restriction of consideration of alternatives<p class='space'> Other variables that influence groupthink: norms, leader power, task characteristics, stage of group development `, `HRM360-CH11`],
    [`When group members feel comfortable disagreeing with other group members`, ``, ``, ``, ``, ``, `<p class='space'>Minority dissent `, `HRM360-CH11book`],
    [`Intuition `, ``, ``, ``, ``, ``, `<p class='space'>Intuition consists of judgments, insights, or decisions that “come to mind on their own, without explicit awareness of the evoking cues and of course without explicit evaluation of the validity of these cues.”<p class='space'>We all have the ability to use intuition.`, `HRM360-CH11book`],
    [`Expertise vs tacit knowledge`, ``, ``, ``, ``, ``, `<p class='space'>Expertise is an individual’s combined explicit knowledge or information that can easily be put into words, and <p class='space'>Tacit knowledge or information we gain through experience that is difficult to express and formalize.`, `HRM360-CH11book`],
    [`Electronic brainstorming - aka brainwriting`, ``, ``, ``, ``, ``, `<p class='space'>Electronic brainstorming, sometimes called brainwriting, allows participants to submit their ideas and alternatives over a computer network. Webinars work well for this purpose.`, `HRM360-CH11book`],
    [`Contingent Consequences`, ``, ``, ``, ``, ``, `<p class='space'>The term contingent here means there is a purposeful if-then link between the target behavior and the consequence.<p class='space'>So you should first think of the target behavior and whether you want to increase or decrease it, and then choose the appropriate consequence.<p class='space'>We next look more closely at the four behavioral controls.<p class='space'>According to Skinner’s operant theory, contingent consequences control behavior in one of four ways: <p class='space'>(1) Positive reinforcement, <p class='space'>(2) Negative reinforcement, <p class='space'>(3) Punishment, <p class='space'>(4) Extinction`, `HRM360-CH11book`],
    [`The Delphi technique`, ``, ``, ``, ``, ``, `<p class='space'>The Delphi technique is a group process that generates anonymous ideas or judgments from physically dispersed experts in multiple rounds of brainstorming.`, `HRM360-CH11book`],
    [` Decision support systems`, ``, ``, ``, ``, ``, `<p class='space'>Decision support systems (DSS) are “computer-based interactive systems that help decision makers to use data and models to solve unstructured problems`, `HRM360-CH11book`]

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
        var btnRedo = "<button onclick='doMissedQuestions()'>Repeat list above</button>";
        var strscore = mCorrect / (mQuestions.length - mSkipped) * 100,
            strcor = mCorrect,
            strtotal = mQuestions.length - mSkipped;
        if (mCorrect == mQuestions.length) {
            mStrResult = 'Great Job!';
            btnRedo = '';
        }
        strscore = strscore.toFixed(0);
        mTest.attr
            // mTest.innerHTML = strcor + " of " + strtotal + " [" + strscore + "%]" + '<p>' + mStrResult + '<br><br> Refresh the page to take the test again.';
        mTest.innerHTML = '<p>' + mStrResult + '<br><br> Refresh the page to reset notes.';

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
    mStrResult = '<p>Items kept:<p>';
    mPos = 0;
    mCorrect = 0;
    renderQuestion();
}

function loadSelectedQuestions() {
    //load missed questions into master array
    mQuestions = arrMissedQuestions;
    //clear missed questions array
    arrMissedQuestions = [];
    mStrResult = '<p>Items Kept:<p>';
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
        mStrResult = mStrResult + '<p>' + (mPos + 1) + '). ' + mQuestions[mPos][0]; // commented out for study tool  + '<p><pre>        Your answer: <b>' + strAnsGiven + '</b></pre><p>';
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
    mStrResult = '<p>Notes to repeat:<p>';
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