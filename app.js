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

    [`1. What is the difference between Data and Information?`, ``, ``, ``, ``, ``, `<p class='space'>Data consists of raw facts where information results from processing raw information. <p class='space'>Information is the result of processing raw data to reveal its meaning.`, `IS380`],
    [`2. What is a database?`, ``, ``, ``, ``, ``, `<p class='space'>A shared, integrated computer structure that houses a collection of related data. <p class='space'>A database contains two types of data: end-user data (raw facts) and metadata. `, `IS380`],
    [`  What is metadata?`, ``, ``, ``, ``, ``, `<p class='space'>Data about data; <p class='space'>That is, data about data characteristics and relationships.<p class='space'>e.g. Technical metadata properties include file types, size, creation date and time, and type of compression.`, `IS380`],
    [`3. What is a DBMS?  `, ``, ``, ``, ``, ``, `<p class='space'>A database management system (DBMS) is a collection of programs that manages, the database structure and controls access to the data stored in the database.`, `IS380`],
    [`a. What are some advantages of a DBMS (why would you use one)?`, ``, ``, ``, ``, ``, `<p class='space'>(1)DBMS enables the data in the database to be shared among multiple applications or users.<p class='space'>(2)Second, the DBMS integrates the many different users’ views of the data into a single all-encompassing data repository.<p class='space'>(3)Improved data sharing<p class='space'>(4)Improved data security<p class='space'>(5)Better data integration<p class='space'>(6)Minimized data inconsistency<p class='space'>(7)Improved data access<p class='space'>(8)Improved decision making<p class='space'>(9)Increased end-user productivity`, `IS380`],
    [`4. What are some disadvantages of using a Database System?`, ``, ``, ``, ``, ``, `<p class='space'>Cost, need to hire technical staff to design, manage, and operate the DBMS system.`, `IS380`],
    [`Understand the different types of databases discussed in the text:`, ``, ``, ``, ``, ``, `<p class='space'>(1)Number of users - Single-user – runs on standalone pc desktop, - Multiuser – supports 50 or fewer users at a time, - Workgroup- supports a specific department, - Enterprise-used by entire company more than 50 users,<p class='space'>(2)Database site location,- Centralized- data located at a single site , - Distributed-data distributed amongst multiple sites ,- Cloud-based-data created and maintained using a cloud data service, AWS MS Azure, Cloud computing is the on-demand delivery of compute power, database, storage, applications, and other IT resources via the internet with pay-as-you-go pricing., <p class='space'>(3)Type of data,- General-purpose- General-purpose databases contain a wide variety of data used in multiple disciplines e.g. LexisNexis and ProQuest databases that contain newspaper, magazine, and journal articles for a variety of topics.- Discipline-specific- Discipline-specific databases contain data focused on specific subject areas., `, `IS380`],
    [`NOSQL DB`, ``, ``, ``, ``, ``, `<p class='space'>NoSQL database. The term NoSQL (Not only SQL) is generally used to describe a new generation of DBMS that is not based on the traditional relational database model. NoSQL databases are designed to handle the unprecedented volume of data, variety of data types and structures, and velocity of data operations that are characteristic of these new business requirements.<p class='space'>examples - MongoDB: The most popular open-source NoSQL system. MongoDB is a document-oriented database that stores JSON-like documents in dynamic schemas. Craigslist, eBay, and Foursquare use MongoDB. CouchDB:`, `IS380`],
    [`Transactional (production) database (OLTP)`, ``, ``, ``, ``, ``, `i. Transactional (production) database (OLTP) - transactions such as product or service sales, payments, and supply purchases reflect critical day-to-day operations. Such transactions must be recorded accurately and immediately. A database that is designed primarily to support a company’s day-to-day operations is classified as an operational database - online transaction processing (OLTP) database, transactional database, or production database. `, `IS380`],
    [`Data warehouse database (OLAP) `, ``, ``, ``, ``, ``, `ii. Data warehouse database (OLAP) - Online analytical processing (OLAP) In contrast, an analytical database focuses primarily on storing historical data and business metrics used exclusively for tactical or strategic decision making. Analytical databases allow the end user to perform advanced analysis of business data using sophisticated tools.  Online analytical processing (OLAP) is a set of tools that work together to provide an advanced data analysis environment for retrieving, processing, and modeling data from the data warehouse. The data warehouse is a specialized data-base that stores data in a format optimized for decision support. The data warehouse contains historical data obtained from the operational databases as well as data from other external sources.`, `IS380`],
    [`f. Degree of data structure`, ``, ``, ``, ``, ``, `i. Unstructured data - Unstructured data is data that exists in its original (raw) state—that is, in the format in which it was collected. Therefore, unstructured data exists in a format that does not lend itself to the processing that yields information., ii. Structured data - Structured data is the result of formatting unstructured data to facilitate storage, use, and generation of information. You apply structure (format) based on the type of processing that you intend to perform on the data. Some data might not be ready (unstructured) for some types of processing, but they might be ready (structured) for other types of processing.`, `IS380`],
    [`Field`, ``, ``, ``, ``, ``, `a. Field - A character or group of characters (alphabetic or numeric) that has a specific meaning. A field is used to define and store data`, `IS380`],
    [`Record`, ``, ``, ``, ``, ``, `b. Record - A logically connected set of one or more fields that describes a person, place, or thing. For example, the fields that constitute a record for a customer might consist of the customer's name, address, phone number, date of birth, credit limit, and unpaid balance.`, `IS380`],
    [`file`, ``, ``, ``, ``, ``, `c. File - A collection of related records. For example, a file might contain data about the students currently enrolled at gigantic University.`, `IS380`],
    [`8. What are some problems with using manual file systems for data processing? `, ``, ``, ``, ``, ``, `A manual file system does not scale well. It is labor intensive if large and is does not facilitate effective searching. , Lengthy development times., Difficulty of getting quick answers., Complex system administration., Lack of security and limited data sharing., Extensive programming.`, `IS380`],
    [`To be considered a Minimally Relational Database, which relational operators must the database support? `, ``, ``, ``, ``, ``, `Select, Join, project, union, intersect, difference, product `, `IS380`],
    [`extended entity relationship (EER) model`, ``, ``, ``, ``, ``, `The EER model builds on entity relationship (ER) concepts and adds support for entity supertypes, subtypes, and entity clustering, enhanced entity relationship model, is the result of adding more semantic constructs to the original ER model`, `IS380`],
    [`Entity Supertypes and Subtypes`, ``, ``, ``, ``, ``, `In modeling terms, an entity supertype is a generic entity type that is related to one or more entity subtypes. The entity supertype contains common characteristics, and the entity subtypes each contain their own unique characteristics. a subtype can exist only within the context of a supertype, and every subtype can have only one supertype to which it is directly related`, `IS380`],
    [`inheritance`, ``, ``, ``, ``, ``, `inheritance enables an entity subtype to inherit the attributes and relationships of the supertype, Entity subtypes inherit all relationships in which the supertype entity participates. `, `IS380`],
    [`Subtype Discriminator`, ``, ``, ``, ``, ``, `A subtype discriminator is the attribute in the supertype entity that determines to which subtype the supertype occurrence is related.   is the attribute in the supertype entity that determines to which subtype the supertype occurrence is related. In Figure 5.2, the subtype discrimi-nator is the employee type (EMP_TYPE). `, `IS380`],
    [`Completeness Constraint`, ``, ``, ``, ``, ``, `completeness constraint specifies whether each entity supertype occurrence must also be a member of at least one subtype, can be partial or total, Partial completeness means that not every supertype occurrence is a member of a subtype; some supertype occurrences may not be members of any subtype. Total completeness means that every supertype occurrence must be a member of at least one subtype. `, `IS380`],
    [`Specialization and Generalization`, ``, ``, ``, ``, ``, `Specialization is the top-down process of identifying lower-level, more specific entity subtypes from a higher-level entity supertype. Generalization is the bottom-up process of identifying a higher-level, more generic entity supertype from lower-level entity subtypes.`, `IS380`],
    [`Entity Clustering`, ``, ``, ``, ``, ``, `use entity clusters to minimize the number of entities shown in the ERD, entity cluster is a “virtual” entity type used to represent multiple entities and relationships in the ERD. When using entity clusters, the key attributes of the combined entities are no longer available. `, `IS380`],
    [`primary key`, ``, ``, ``, ``, ``, ` (a single attribute or some combination of attributes), which uniquely identifies each entity instance. function of the primary key is to guarantee entity integrity, not to “describe” the entity`, `IS380`],
    [`natural key or natural identifier`, ``, ``, ``, ``, ``, `natural key or natural identifier is a real-world, generally accepted identifier used to distinguish, that is, uniquely identify, real-world objects. `, `IS380`],
    [`Surrogate Primary Keys`, ``, ``, ``, ``, ``, `A surrogate key is a primary key created by the database designer to simplify the identification of entity instances. The surrogate key has no meaning in the user’s environment, it exists only to distinguish one entity instance from another (just like any other primary key). One practical advantage of a surrogate key is that because it has no intrinsic meaning, values for it can be generated by the DBMS to ensure that unique values are always provided. Surrogate primary keys are accepted practice in today’s complex data environments.`, `IS380`],
    [`DML`, ``, ``, ``, ``, ``, `<p class='space'>data manipulation language (DML).<p class='space'>SQL is a DML- it includes commands to insert, update, delete data within the database tables. `, `IS380-CH7`],
    [`DDL`, ``, ``, ``, ``, ``, `<p class='space'>Data definition language (DDL). <p class='space'>SQL includes commands to create database objects (CREATE, ALTER, DROP, RENAME, TRUNCATE) such as tables, indexes, and views, as well as commands to define access rights to those database objects.`, `IS380-CH7`],
    [`DQL`, ``, ``, ``, ``, ``, `<p class='space'>Date Query Language<p class='space'>Documentum Query Language (DQL) is a language to query Documentum content management system. This, we use to create, manage, deliver, and archive all type of contents from text documents and spreadsheets to digital images, HTML, and XML components.<p class='space'>SELECT`, `IS380-CH7`],
    [`TCL`, ``, ``, ``, ``, ``, `<p class='space'>Transaction Control Language (TCL) - COMMIT, ROLLBACK, SAVEPOINT `, `IS380-CH7`],
    [`DCL`, ``, ``, ``, ``, ``, `<p class='space'>Data Control Language (DCL) - GRANT, REVOKE -<p class='space'>used to control access to database objects. `, `IS380-CH7`],
    [`SQL`, ``, ``, ``, ``, ``, `<p class='space'>Structured Query Language<p class='space'>Its basic command set has a vocabulary of fewer than 100 words.<p class='space'>ANSI SQL standard`, `IS380-CH7`],
    [`Three fundament types of data`, ``, ``, ``, ``, ``, `<p class='space'>character data, <p class='space'>numeric data,<p class='space'>date data.`, `IS380-CH7`],
    [`alias `, ``, ``, ``, ``, ``, `<p class='space'>An alternative name for a column or table in a SQL statement.<p class='space'>Using a table alias allows the database programmer to improve the maintainability of the code by using a table alias that is descriptive of what data the table is providing within the query.  `, `IS380-CH7`],
    [`A computed column`, ``, ``, ``, ``, ``, `<p class='space'>A computed column (also called a calculated column) represents a derived attribute,  `, `IS380-CH7`],
    [`natural join`, ``, ``, ``, ``, ``, `<p class='space'>natural join returns all rows with matching values in the matching columns and eliminates duplicate columns.`, `IS380-CH7`],
    [`outer join returns?`, ``, ``, ``, ``, ``, `<p class='space'>outer join returns not only the rows matching the join condition (that is, rows with matching values in the common columns), but it also returns the rows with unmatched values. <p class='space'>The ANSI standard defines three types of outer joins: left, right, and full. <p class='space'>The left and right designations reflect the order in which the tables are processed by the DBMS. <p class='space'>Remember that join operations take place two tables at a time. <p class='space'>The first table named in the FROM clause will be the left side, and the second table named will be the right side.  `, `IS380-CH7`],
    [`cross join`, ``, ``, ``, ``, ``, `<p class='space'>cross join performs a relational product (also known as the Cartesian product) of two tables`, `IS380-CH7`],
    [`recursive query `, ``, ``, ``, ``, ``, `<p class='space'>recursive query<p class='space'>A query that joins a table to itself. `, `IS380-CH7`],
    [`WHERE`, ``, ``, ``, ``, ``, `<p class='space'>where<p class='space'>A SQL clause that adds conditional restrictions to a SELECT statement that limit the rows returned by the query `, `IS380-CH7`],
    [`boolean algebra`, ``, ``, ``, ``, ``, `<p class='space'>boolean algebra<p class='space'>is dedicated to the use of logical operators`, `IS380-CH7`],
    [`The number of join conditions `, ``, ``, ``, ``, ``, `<p class='space'>is always equal to the number of tables being joined minus one.`, `IS380-CH7`],
    [`What does  separation of responsibilities mean when applied to joins?`, ``, ``, ``, ``, ``, `<p class='space'>Having a clear separation of responsibilities among the SELECT query clauses makes code maintenance easier. <p class='space'>With JOIN ON or JOIN USING syntax, all of the code necessary to join the tables together is located in the FROM clause. All of the code necessary to restrict the data based on business requirements is located in the WHERE clause. With an old-style join, the criteria for completing the join are mixed with the criteria to restrict the data based on business requirements. Second, the old-style join is susceptible to undetected errors that other joins are not.`, `IS380-CH7`],
    [`NULL `, ``, ``, ``, ``, ``, `<p class='space'>NULL is not a “value” the way the number 0 or the blank space is; instead, a NULL is a special property of an attribute that represents the absence of any value.\The use of the IS NULL operator is useful in many situations. For example, it is often used to find unmatched rows, as shown in Figure 7.32. `, `IS380-CH7`],
    [`COUNT`, ``, ``, ``, ``, ``, `<p class='space'>Count, A SQL aggregate function that outputs the number of rows containing not null values for a given column or expression, sometimes used in conjunction with the DISTINCT clause`, `IS380-CH7`],
    [`correlated subquery`, ``, ``, ``, ``, ``, `<p class='space'>correlated subquery A subquery that executes once for each row in the outer query.`, `IS380-CH7`],
    [`EXISTS`, ``, ``, ``, ``, ``, `<p class='space'>EXISTS In SQL, a comparison operator that checks whether a subquery returns any rows`, `IS380-CH7`],


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
    if (flagShuffle == true) mQuestions = shuffle(mQuestions);
    // flagShuffle = false;
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
    renderQuestion();
}


const btnOptions = document.getElementById('btnshow');
const optPanel = document.getElementById('list-topics');

loadQuestionsArray();
document.getElementById("loadSubsetBtn").addEventListener('click', loadQuestionsArray, false);
window.addEventListener("load", renderQuestion, false);
window.addEventListener("load", popArray, false);
document.getElementById('flagShuffle').addEventListener('click', function() {
    if (document.getElementById('flagShuffle').checked === true)
        flagShuffle = true;
    else
        flagShuffle = false;
})
btnOptions.addEventListener('click', function() {
    optPanel.classList.toggle('hidden');
})