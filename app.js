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
[`What is the difference between Data and Information?`,``,``,``,``, ``,`<p class='space'>Data consists of raw facts where information results from processing raw information. <p class='space'>Information is the result of processing raw data to reveal its meaning.`, `IS380-ch01`],
[`What is a database?`,``,``,``,``, ``,`A shared, integrated computer structure that houses a collection of related data. A database contains two types of data: end-user data (raw facts) and metadata. `, `IS380-ch01`],
[`  What is metadata?`,``,``,``,``, ``,`Data about data; that is, data about data characteristics and relationships.`, `IS380-ch01`],
[`What is a DBMS?  `,``,``,``,``, ``,`A database management system (DBMS) is a collection of programs that manages, the database structure and controls access to the data stored in the database.`, `IS380-ch01`],
[`What are some advantages of a DBMS (why would you use one)?`,``,``,``,``, ``,`\nFirst, the DBMS enables the data in the database to be shared among multiple applications or users. <p class='space'>Second, the DBMS integrates the many different users’ views of the data into a single all-encompassing data repository\nImproved data sharing\nImproved data security\nBetter data integration\n Minimized data inconsistency\nImproved data access\nImproved decision making\nIncreased end-user productivity`, `IS380-ch01`],
[`What are some disadvantages of using a Database System?`,``,``,``,``, ``,`Cost, need to hire technical staff to design, manage, and operate the DBMS system.`, `IS380-ch01`],
[`Understand the different types of databases discussed in the text:`,``,``,``,``, ``,`<p class='space'>a. Number of users, <p class='space'>i. Single-user – runs on standalone pc desktop, <p class='space'>ii. Multiuser – supports 50 or fewer users at a time, <p class='space'>iii. Workgroup- supports a specific department, <p class='space'>iv. Enterprise-used by entire company more than 50 users, <p class='space'>b. Database site location, <p class='space'>i. Centralized- data located at a single site , <p class='space'>ii. Distributed-data distributed amongst multiple sites , <p class='space'>iii. Cloud-based-data created and maintained using a cloud data service, AWS MS Azure, Cloud computing is the on-demand delivery of compute power, database, storage, applications, and other IT resources via the internet with pay-as-you-go pricing., <p class='space'>c. Type of data, i. General-purpose- General-purpose databases contain a wide variety of data used in multiple disciplines e.g. LexisNexis and ProQuest databases that contain newspaper, magazine, and journal articles for a variety of topics., <p class='space'>ii. Discipline-specific- Discipline-specific databases contain data focused on specific subject areas., `, `IS380-ch01`],
[`NOSQL DB`,``,``,``,``, ``,`d. NoSQL database. The term NoSQL (Not only SQL) is generally used to describe a new generation of DBMS that is not based on the traditional relational database model. NoSQL databases are designed to handle the unprecedented volume of data, variety of data types and structures, and velocity of data operations that are characteristic of these new business requirements.`, `IS380-ch01`],
[`Transactional (production) database (OLTP)`,``,``,``,``, ``,`i. Transactional (production) database (OLTP) - transactions such as product or service sales, payments, and supply purchases reflect critical day-to-day operations. <p class='space'>Such transactions must be recorded accurately and immediately. A database that is designed primarily to support a company’s day-to-day operations is classified as an operational database - online transaction processing (OLTP) database, transactional database, or production database. `, `IS380-ch01`],
[`Data warehouse database (OLAP) `,``,``,``,``, ``,`ii. Data warehouse database (OLAP) - Online analytical processing (OLAP) In contrast, an analytical database focuses primarily on storing historical data and business metrics used exclusively for tactical or strategic decision making. <p class='space'>Analytical databases allow the end user to perform advanced analysis of business data using sophisticated tools.  <p class='space'>Online analytical processing (OLAP) is a set of tools that work together to provide an advanced data analysis environment for retrieving, processing, and modeling data from the data warehouse. The data warehouse is a specialized data-base that stores data in a format optimized for decision support. <p class='space'>The data warehouse contains historical data obtained from the operational databases as well as data from other external sources.`, `IS380-ch01`],
[`Degree of data structure`,``,``,``,``, ``,`\nUnstructured data - Unstructured data is data that exists in its original (raw) state—that is, in the format in which it was collected. Therefore, unstructured data exists in a format that does not lend itself to the processing that yields information\nStructured data - Structured data is the result of formatting unstructured data to facilitate storage, use, and generation of information. You apply structure (format) based on the type of processing that you intend to perform on the data. Some data might not be ready (unstructured) for some types of processing, but they might be ready (structured) for other types of processing.`, `IS380-ch01`],
[`Field`,``,``,``,``, ``,`<p class='space'>a. Field - A character or group of characters (alphabetic or numeric) that has a specific meaning. <p class='space'> A field is used to define and store data<p class='space'>In data base terms, a field is an attribute.`, `IS380-ch01`],
[`Record`,``,``,``,``, ``,`<p class='space'>b. Record - A logically connected set of one or more fields that describes a person, place, or thing. <p class='space'>For example, the fields that constitute a record for a customer might consist of the customer's name, address, phone number, date of birth, credit limit, and unpaid balance.<p class='space'>In database terms, a record is a tuple or a row.`, `IS380-ch01`],
[`file`,``,``,``,``, ``,`<p class='space'>c. File - A collection of related records. <p class='space'>For example, a file might contain data about the students currently enrolled at gigantic University.`, `IS380-ch01`],
[`What are some problems with using manual file systems for data processing? `,``,``,``,``, ``,`<p class='space'>A manual file system does not scale well. It is labor intensive if large and is does not facilitate effective searching. , Lengthy development times., Difficulty of getting quick answers., Complex system administration., Lack of security and limited data sharing., Extensive programming.`, `IS380-ch01`],
[`To be considered a Minimally Relational Database, which relational operators must the database support? `,``,``,``,``, ``,`<p class='space'>Select,<p class='space'>Project,<p class='space'>Join`, `IS380-ch01`],
[`extended entity relationship (EER) model`,``,``,``,``, ``,`<p class='space'>The EER model builds on entity relationship (ER) concepts and adds support for entity supertypes, subtypes, and entity clustering, enhanced entity relationship model, is the result of adding more semantic constructs to the original ER model`, `IS380-ch01`],
[`Entity Supertypes and Subtypes`,``,``,``,``, ``,`<p class='space'>In modeling terms, an entity supertype is a generic entity type that is related to one or more entity subtypes. <p class='space'>The entity supertype contains common characteristics, and the entity subtypes each contain their own unique characteristics. a subtype can exist only within the context of a supertype, and every subtype can have only one supertype to which it is directly related`, `IS380-ch01`],
[`inheritance`,``,``,``,``, ``,`<p class='space'>inheritance enables an entity subtype to inherit the attributes and relationships of the supertype, Entity subtypes inherit all relationships in which the supertype entity participates. `, `IS380-ch01`],
[`Subtype Discriminator`,``,``,``,``, ``,`<p class='space'>A subtype discriminator is the attribute in the supertype entity that determines to which subtype the supertype occurrence is related.   is the attribute in the supertype entity that determines to which subtype the supertype occurrence is related. In Figure 5.2, the subtype discrimi-nator is the employee type (EMP_TYPE). `, `IS380-ch01`],
[`Completeness Constraint`,``,``,``,``, ``,`<p class='space'>completeness constraint specifies whether each entity supertype occurrence must also be a member of at least one subtype, can be partial or total, Partial completeness means that not every supertype occurrence is a member of a subtype; some supertype occurrences may not be members of any subtype. Total completeness means that every supertype occurrence must be a member of at least one subtype. `, `IS380-ch01`],
[`Specialization and Generalization`,``,``,``,``, ``,`<p class='space'>Specialization is the top-down process of identifying lower-level, more specific entity subtypes from a higher-level entity supertype. <p class='space'>Generalization is the bottom-up process of identifying a higher-level, more generic entity supertype from lower-level entity subtypes.`, `IS380-ch01`],
[`Entity Clustering`,``,``,``,``, ``,`<p class='space'>use entity clusters to minimize the number of entities shown in the ERD, entity cluster is a “virtual” entity type used to represent multiple entities and relationships in the ERD. <p class='space'>When using entity clusters, the key attributes of the combined entities are no longer available. `, `IS380-ch01`],
[`primary key`,``,``,``,``, ``,` <p class='space'>(a single attribute or some combination of attributes), which uniquely identifies each entity instance. function of the primary key is to guarantee entity integrity, not to “describe” the entity\nA null is never allowed in any part of the primary key.`, `IS380-ch01`],
[`natural key or natural identifier`,``,``,``,``, ``,`natural key or natural identifier is a real-world, generally accepted identifier used to distinguish, that is, uniquely identify, real-world objects. `, `IS380-ch01`],
[`Surrogate Primary Keys`,``,``,``,``, ``,`<p class='space'>A surrogate key is a primary key created by the database designer to simplify the identification of entity instances. <p class='space'>The surrogate key has no meaning in the user’s environment, it exists only to distinguish one entity instance from another (just like any other primary key). <p class='space'>One practical advantage of a surrogate key is that because it has no intrinsic meaning, values for it can be generated by the DBMS to ensure that unique values are always provided.<p class='space'>Surrogate primary keys are accepted practice in today’s complex data environments.`, `IS380-ch01`],
[`What is structural dependence?`,``,``,``,``, ``,`<p class='space'>A data characteristic in which a change in the database schema affects data access, thus requiring changes in all access programs. structural dependence, which means access to the data in a file is dependent on its structure.`, `IS380-ch01`],
[`What is data dependence?`,``,``,``,``, ``,`<p class='space'>A data condition in which data representation and manipulation are dependent on the physical data storage characteristics.<p class='space'>Applications implemented in pre-relational database systems are data‑dependent, meaning that both the physical representation of the data and the methods of accessing it are built directly into the application code. <p class='space'>This makes even the slightest change to the physical design of a database an extraordinarily laborious effort.`, `IS380-ch01`],
[`The main objective of relational DBMSs is `,``,``,``,``, ``,`<p class='space'>data independence`, `IS380-ch01`],
[`What does the term “Islands of Information” refer to?`,``,``,``,``, ``,`<p class='space'>In the old file system environment, pools of independent, often duplicated, and inconsistent data created and managed by different departments. <p class='space'>A data island is a data store, such as on a PDA or other computing device, that has non-existent or limited external connectivity. <p class='space'>This limits the ability of the user to synchronize with or copy the data to other devices. <p class='space'>Though new data can be added to the system, the ability to move that data elsewhere is impractical or impossible.`, `IS380-ch01`],
[`What is data redundancy?`,``,``,``,``, ``,` <p class='space'>Exists when the same data is stored unnecessarily at different places. <p class='space'>Data redundancy is the repetition or superfluity of data. <p class='space'>Data redundancy data is an common issue in computer data storage and database systems. <p class='space'>This data repetition may occur either if an attribute is repeated in two or more tables or if the attribute is repeated within the table.`, `IS380-ch01`],
[`What are data redundancy problems?`,``,``,``,``, ``,`<p class='space'>Increases the size of the database unnecessarily. <p class='space'>Poor data security. <p class='space'>Data inconsistency. <p class='space'>Data-entry errors. <p class='space'>Data integrity problems. <p class='space'>Decreases efficiency of database.`, `IS380-ch01`],
[`What is SQL (Structured Query Language)? `,``,``,``,``, ``,`<p class='space'>SQL is a standard language – pseudo standard language - for accessing and manipulating databases. <p class='space'>SQL is used to communicate with a database. <p class='space'>To unify SQL for best practices, the American National Standards Institute (ANSI) created specific standards for database query languages. <p class='space'>The fundamental SQL commands and statements are similar for all SQL dialects, so once a DBA knows how to use one, they can learn others easily.`, `IS380-ch01`],
[`CRUD`,``,``,``,``, ``,`<p class='space'> (CRUD) are the four basic functions of persistent storage.<p class='space'>Create<p class='space'>Read<p class='space'>Update<p class='space'>Delete`, `IS380-ch01`],
[`What is structured data?`,``,``,``,``, ``,`<p class='space'>Structured data - Structured data is the result of formatting unstructured data to facilitate storage, use, and generation of information. <p class='space'>You apply structure (format) based on the type of processing that you intend to perform on the data. Some data might not be ready (unstructured) for some types of processing, but they might be ready (structured) for other types of processing.`, `IS380-ch01`],
[`What is a Database Model and why is it important?`,``,``,``,``, ``,`<p class='space'>A data model is a relatively simple representation, usually graphical, of more complex real-world data structures. a model is an abstraction of a more complex real-world object or event. <p class='space'>This blueprint is narrative and graphical in nature, meaning that it contains both text descriptions in plain, unambiguous language and clear, useful diagrams depicting the main data elements. <p class='space'>It is important because it provides a clear picture of how the pieces of a business fit together, this allows the development of an effective database.`, `IS380-ch02`],
[`What is an entity?`,``,``,``,``, ``,`<p class='space'>An entity is a person, place, thing, or event about which data will be collected and stored. <p class='space'>An entity represents a particular type of object in the real world, which means an entity is “distinguishable”—that is, each entity occurrence is unique and distinct.`, `IS380-ch02`],
[`What is an attribute?`,``,``,``,``, ``,`<p class='space'>An attribute is a characteristic of an entity. <p class='space'>For example, a CUSTOMER entity would be described by attributes such as customer last name, customer first name, customer phone number, customer address, and customer credit limit. <p class='space'>Attributes are the equivalent of fields in file systems.`, `IS380-ch02`],
[`What is a relationship?`,``,``,``,``, ``,`<p class='space'>Relationships describe associations among data. Most relationships describe associations between two entities. <p class='space'>The ER model uses the term connectivity to label the relationship types. The name of the relationship is usually an active or passive verb. <p class='space'>For example, a PAINTER paints many PAINTINGs, an EMPLOYEE learns many SKILLs, and an EMPLOYEE manages a STORE. Data models use three types of relationships: one-to-many, many-to-many, and one-to-one. Database designers usually use the shorthand notations 1:M or 1..*, M:N or *..*, and 1:1 or 1..1, respectively.`, `IS380-ch02`],
[`What are business rules and how they are used in database modeling context?`,``,``,``,``, ``,`<p class='space'>A business rule is a brief, precise, and unambiguous description of a policy, procedure, or principle within a specific organization. <p class='space'>Properly written business rules are used to define entities, attributes, relationships, and constraints. <p class='space'>Any time you see relationship statements such as “an agent can serve many customers, and each customer can be served by only one agent,” business rules are at work.`, `IS380-ch02`],
[`What is a constraint? `,``,``,``,``, ``,`<p class='space'>A constraint is a restriction placed on the data. <p class='space'>Constraints are important because they help to ensure data integrity. Constraints are normally expressed in the form of rules: For example, Each class must have one and only one teacher.`, `IS380-ch02`],
[`Hierarchical Model – `,``,``,``,``, ``,`<p class='space'>Hierarchical Model – more semantic - basic logical structure is represented by an upside-down tree. hierarchical structure contains levels, or segments, segment is the equivalent of a file system’s record type. a higher layer is perceived as the parent of the segment directly beneath it. <p class='space'>Each parent can have many children, but each child has only one parent. Advantages - Efficient with 1 to Many relationships. Conceptually simple, has database security through DBMS. <p class='space'>Disadvantages – Complex implementation, structural dependence, <p class='space'>no many to many relationships, <p class='space'>no data definition or data manipulation language, a lack of standards.`, `IS380-ch02`],
[`Network Model`,``,``,``,``, ``,`<p class='space'>Network Model - more semantic - created to represent complex data relationships more effectively than the hierarchical model, to improve database performance, and to impose a database standard. <p class='space'>Allows child to have more than one parent. – replaced hierarchical model because it easier to represent complex (many-to-many) relationships. <p class='space'>Advantages – conceptual simplicity, handles many to many relationships, more conformance to standards, includes DDL - data definition language and DML - data manipulation language. <p class='space'>Disadvantage – complex limits efficiency, navigation system yields complex implementation – app development and management; Structurally dependent.`, `IS380-ch02`],
[`Relational Model`,``,``,``,``, ``,`<p class='space'>Relational Model – even more semantic - introduced in 1970 by E. F. Codd of IBM in his landmark paper “A Relational Model of Data for Large Shared Databanks”, foundation is a mathematical concept known as a relation. <p class='space'>You can think of a relation (sometimes called a table) as a two-dimensional structure composed of intersecting rows and columns. Each row in a relation is called a tuple. Each column represents an attribute. relational data model is implemented through a very sophisticated relational database management system (RDBMs). the relational model offers several advantages over the hierarchical and network models through its simpler data representation, superior data independence, and easy-to-use query language. <p class='space'>Advantages – structurally independent tabular view improves conceptual simplicity, ad hoc query capability using sql, powerful RDBMS isolates user from physical-level details.`, `IS380-ch02`],
[`RDBMs - relational database management system (RDBMs).`,``,``,``,``, ``,`<p class='space'>RDBMs - relational database management system (RDBMs). <p class='space'>The RDBMS performs the same basic functions provided by the hierarchical and network DBMS systems, in addition to a host of other functions that make the relational data model easier to understand and implement. <p class='space'>most important advantage of RDBMS it hides the complexities of the relational model from the user, manages all of the physical details, while the user sees the relational database as a collection of tables in which data is stored. The user can manipulate and query the data in a way that seems intuitive and logical.`, `IS380-ch02`],
[`Object Oriented data model`,``,``,``,``, ``,`<p class='space'>Object Oriented – most semantic - object-oriented data model (OODM), both data and its relationships are contained in a single structure known as an object. OODM is the basis for the object-oriented database management system (OODBMs). OODM is said to be a semantic data model because semantic indicates meaning. Objects that share similar characteristics are grouped in classes. A class is a collection of similar objects with shared structure (attributes) and behavior (methods). In a general sense, a class resembles the ER model’s entity set. However, a class is different from an entity set in that it contains a set of procedures known as methods. <p class='space'>A class’s method represents a real-world action such as finding a selected PERSON’s name, changing a PERSON’s name, or printing a PERSON’s address. <p class='space'>The OO data model introduced support for complex data within a rich semantic framework. The ERDM added many OO features to the relational model and allowed it to maintain strong market share within the business environment. <p class='space'>Advantages – semantic content added, visual representation includes semantic content, inheritance promotes data integrity. <p class='space'>Disadvantage – slow development standards, complex navigational system, deep learning curve, high system overhead, slow transactions.`, `IS380-ch02`],
[`Extended Relational Data Model  - (ERDM)`,``,``,``,``, ``,`<p class='space'>Extended Relational – most semantic - extended relational data model (ERDM). <p class='space'>The ERDM adds many of the OO model’s features within the inherently simpler relational database structure. The ERDM gave birth to a new generation of relational databases that support OO features such as objects (encapsulated data and methods), extensible data types based on classes, and inheritance. That’s why a DBMS based on the ERDM is often described as an object/relational database management system (O/R DBMs). <p class='space'>Today, most relational database products can be classified as object/relational, and they represent the dominant market share of OLTP and OLAP database applications.`, `IS380-ch02`],
[`What is semantic data?`,``,``,``,``, ``,`<p class='space'>Semantic data systems are designed to represent the real world as accurately as possible within the data set. <p class='space'>Data symbols are organized linearly and hierarchically to give certain meanings like the one described above. <p class='space'>By representing the real world within data sets, semantic data allow machines to interact with worldly information without human interpretation. <p class='space'>In order of lowest to highest for semantic data, hierarchical, network, Relational, entity relationship, OO and O/R DBMS.`, `IS380-ch02`],
[`What is a class? – `,``,``,``,``, ``,`<p class='space'>A class is a template for an object.`, `IS380-ch02`],
[`What is inheritance? - `,``,``,``,``, ``,`<p class='space'>Inheritance is defined as the ability of a lower-level object to inherit, or access, the data items and behaviors associated with all classes which are above it in the class hierarchy. In DBMS inheritance can be achieved by the “ISA-relationship”.`, `IS380-ch02`],
[`What is the Extended Relational Model?`,``,``,``,``, ``,`<p class='space'>ERDBMSs have characteristics of both an RDBMS and an ODBMS (thus, the loose application of the ORDBMS label). <p class='space'>ERDBMS products provide a relational data model and query language that have been extended to include many of the features that are typical of ODBMSs.`, `IS380-ch02`],
[`What is XML?`,``,``,``,``, ``,`<p class='space'>Extensible Mark up language. a metalanguage which allows users to define their own customized markup languages, especially in order to display documents on the Internet. <p class='space'>Extensible Markup Language (XML) is a simple, very flexible text format derived from SGML (Standard Generalized Markup Language) (ISO 8879).<p class='space'>Originally designed to meet the challenges of large-scale electronic publishing, XML is also playing an increasingly important role in the exchange of a wide variety of data on the Web and elsewhere.`, `IS380-ch02`],
[`NoSQL - Why did they emerge?`,``,``,``,``, ``,`<p class='space'>A significant amount of the Data is unstructured today – Big Data. NoSQL databases are able to handle this type of data.`, `IS380-ch02`],
[`NoSQL - What are their characteristics?`,``,``,``,``, ``,`<p class='space'>NoSQL databases are databases, and the NoSQL model represents a different way of approaching the storage and processing of data in a nonrelational way. NoSQL databases provide distributed, fault-tolerant databases for processing non-structured data.`, `IS380-ch02`],
[`NoSQL - Is the priority performance or consistency?`,``,``,``,``, ``,`<p class='space'>They are geared for performance.`, `IS380-ch02`],
[`NoSQL - What is the key-value data model?`,``,``,``,``, ``,`<p class='space'>The concept used by the JSON - Javascript Object notation. <p class='space'>Data is stored in key:value pairs. <p class='space'>A key-value pair (KVP) is an abstract data type that includes a group of key identifiers and a set of associated values. <p class='space'>Key-value pairs are frequently used in lookup tables, hash tables and configuration files. <p class='space'>A key-value database is a type of nonrelational database that uses a simple key-value method to store data. <p class='space'>A key-value database stores data as a collection of key-value pairs in which a key serves as a unique identifier. <p class='space'>Both keys and values can be anything, ranging from simple objects to complex compound objects. `, `IS380-ch02`],
[`(4) data base models (classified by degrees of abstraction)`,``,``,``,``, ``,`<p class='space'>(1)External – Cover End-user views - Hardware and software independent.<p class='space'>(2)Conceptual – Covers Global view of data (database model independent) - Hardware and software independent. Conceptual models are better suited for high-level data modeling, while implementation models are better for managing stored data for implementation purposes. The ER model is an example of a conceptual model<p class='space'>(3)Internal – Covers Specific database model - Hardware independent.<p class='space'>(4)Physical – Covers Storage and access methods - Dependent on HW/SW. The physical model operates at the lowest level of abstraction, describing the way data is saved on storage media such as magnetic, solid state, or optical media.`, `IS380-ch02`],
[`What is Big Data?`,``,``,``,``, ``,`<p class='space'>Big Data -  movement to find new and better ways to manage large amounts of web-and sensor-generated data and derive business insight from it, while simultaneously providing high performance and scalability at a reasonable cost. `, `IS380-ch02`],
[`Three V's of bid data:`,``,``,``,``, ``,`<p class='space'>(1)Volume - refers to the amounts of data being stored. organizations are using multiple technologies to interact with end users and those technologies are generating mountains of data. This ever-growing volume of data quickly reached petabytes in size<p class='space'>(2)Velocity - refers not only to the speed with which data grows but also to the need to process this data quickly in order to generate information and insight. Organizations need not only to store large volumes of quickly accumulating data but also need to process such data quickly. The velocity of data growth is also due to the increase in the number of different data streams from which data is being piped to the organization (via the web, e-commerce, Tweets, Facebook posts, emails, sensors, GPS, and so on).<p class='space'>(3)Variety - refers to the fact that the data being collected comes in multiple different data formats. A great portion of these data comes in formats not suitable to be handled by the typical operational databases based on the relational model.`, `IS380-ch02`],
[`What is the difference between a database and a table?`,``,``,``,``, ``,`<p class='space'>A table is an object that lists information in rows and columns.<p class='space'>A database is a collection of tables that includes relationships to tie the tables together.`, `IS380-ch03`],
[`What is an Attribute Domain?`,``,``,``,``, ``,`<p class='space'>An attribute domain is a range of values for a column / attribute. E.g. a column for student GPA can have a value between 0 and 4.0.`, `IS380-ch03`],
[`What are keys?`,``,``,``,``, ``,`<p class='space'>One or more attributes that determine other attributes.<p class='space'>They ensure that each tuple within a table is uniquely identified.<p class='space'>Keys are used to link data form one table to another table.`, `IS380-ch03`],
[`In reference to dependencies - define determinant`,``,``,``,``, ``,`<p class='space'>Any attribute in a specific row whose value directly determines other values in that row.<p class='space'>A determinant in a database table is any attribute that you can use to determine the values assigned to other attribute(s) in the same row.`, `IS380-ch03`],
[`In reference to dependencies - define dependent`,``,``,``,``, ``,`<p class='space'>An attribute whose value is determined by another attribute.`, `IS380-ch03`],
[`Primary Key (Important)`,``,``,``,``, ``,`<p class='space'>A primary key is an attribute within a row that uniquely identifies rows in a table.<p class='space'>The ERM uses identifiers,one or more attributes that uniquely identify each entity instance.<p class='space'>In the relational model, an identifier composed of one or more attributes that uniquely identifies a row. Also, a candidate key selected as a unique entity identifier.`, `IS380-ch03`],
[`Foreign Key (Important)`,``,``,``,``, ``,`<p class='space'>An attribute or attributes in one table whose values must match the primary key in another table or whose values must be null.<p class='space'>This ties the row that the FK is in to another table that uses the attribute for its primary key.<p class='space'>a foreign key is used to establish relationship between two tables.`, `IS380-ch03`],
[`Superkey`,``,``,``,``, ``,`<p class='space'>A superkey is a combination of columns that uniquely identifies any row within a relational database management system (RDBMS) table.<p class='space'>A candidate key is a closely related concept where the superkey is reduced to the minimum number of columns required to uniquely identify each row.`, `IS380-ch03`],
[`Candidate key`,``,``,``,``, ``,`<p class='space'>Basically, a Candidate Key is a Super Key from which no more attributes can be pruned.<p class='space'>A Super Key identifies uniquely rows/tuples in a table/relation of a database.`, `IS380-ch03`],
[`Secondary key/Index (Important)`,``,``,``,``, ``,`<p class='space'>Data retrieval for a customer is easier when the customer’s last name and phone number are used. In that case, the primary key is the customer number; the secondary key is the combination of the customer’s last name and phone number. Keep in mind that a secondary key does not necessarily yield a unique outcome.\nA secondary index is a data structure that contains a subset of attributes from a table, along with an alternate key to support Query operations.<p class='space'>You can retrieve data from the index using a Query, in much the same way as you use Query with a table.`, `IS380-ch03`],
[`What is a Composite Key?`,``,``,``,``, ``,`<p class='space'>A multiple-attribute key. A composite key is a combination of two or more columns in a table that can be used to uniquely identify each row in the table when the columns are combined uniqueness is guaranteed, but when it taken individually it does not guarantee uniqueness.`, `IS380-ch03`],
[`What is entity integrity?`,``,``,``,``, ``,`\nEntity integrity is the condition in which each row (entity instance) in the table has its own unique identity.<p class='space'>The property of a relational table that guarantees each entity has <p class='space'>(1)a unique value in a primary key and that <p class='space'>(2)the key has no null values.`, `IS380-ch03`],
[`What is referential integrity?`,``,``,``,``, ``,`<p class='space'>A condition by which a dependent table’s foreign key must have <p class='space'>(1)either a null entry or <p class='space'>(2)a matching entry in the related table.\nReferential integrity is not bidirectional`, `IS380-ch03`],
[`What is a null? What are some issues associated with nulls?`,``,``,``,``, ``,`<p class='space'>A null is the absence of a value, in other words the value is unknown.<p class='space'>Nulls need special handling, if allowed. NULL breaks two-value (familiar True or False) logic, and requires a three-value logic.`, `IS380-ch03`],
[`What is the System Catalog?`,``,``,``,``, ``,`<p class='space'>A detailed system data dictionary that describes all objects in a database.`, `IS380-ch03`],
[`What is the Data Dictionary?`,``,``,``,``, ``,`<p class='space'>A DBMS component that stores metadata—data about data.<p class='space'>Thus, the data dictionary contains the data definition as well as its characteristics and relationships.<p class='space'>A data dictionary may also include data that is external to the DBMS.<p class='space'>Also known as an information resource dictionary.`, `IS380-ch03`],
[`What are database homonyms? Give an example.`,``,``,``,``, ``,`<p class='space'>The use of the same name to label different attributes.<p class='space'>Homonyms generally should be avoided. Examples using first_name for a table listing customers as well as a different table listing employees, also using ID in multiple tables.<p class='space'>A suffix could be added to eliminate the issue, e.g. cust_id, emp_id.`, `IS380-ch03`],
[`What are database synonyms? Give an example.`,``,``,``,``, ``,`<p class='space'>A database synonym is the use of different words for the same type of entity, Auto vs car or address vs location.`, `IS380-ch03`],
[`What is a composite entity used for (also referred to as bridge entity or an associative entity)`,``,``,``,``, ``,`<p class='space'>An entity designed to transform an Many to Many relationship into two 1 to many relationships.<p class='space'>The composite entity’s primary key comprises at least the primary keys of the entities that it connects.<p class='space'>Also known as a bridge entity or associative entity.`, `IS380-ch03`],
[`ERM (entity relationship model) vs ERD (entity relationship diagrams_`,``,``,``,``, ``,`<p class='space'>The ERM uses ERDs to represent the conceptual database as viewed by the end user. <p class='space'>The ERM’s main components are entities, relationships, and attributes. <p class='space'>The ERD includes connectivity and cardinality notations, and can also show relationship strength, relationship participation (optional or mandatory), and degree of relationship (such as unary, binary, or ternary).`, `IS380-ch03`],
[`Entity set and table`,``,``,``,``, ``,`\nthe terms entity set and table are often used interchangeably\nYou can think of a table as a persistent representation of a logical relation—that is, a relation whose contents can be permanently saved for future use. \nAs far as the table’s user is concerned, a table contains a group of related entity occurrences—that is, an entity set. For example, a STUDENT table contains a collection of entity occurrences, each representing a student.`, `IS380-ch03`],
[`Logical vs Physical concepts`,``,``,``,``, ``,`\nThe database table is a logical concept rather than a physical concept, and the terms file, record, and field describe physical concepts.`, `IS380-ch03`],
[`Determination is the:`,``,``,``,``, ``,`\nDetermination is the state in which knowing the value of one attribute makes it possible to determine the value of another.`, `IS380-ch03`],
[`functional dependence`,``,``,``,``, ``,`\nA specific terminology and notation is used to describe relationships based on determination. The relationship is called functional dependence, which means that the value of one or more attributes determines the value of one or more other attributes.\nthe attribute whose value determines another is called the determinant or the key.\nThe attribute whose value is determined by the other attribute is called the dependent.`, `IS380-ch03`],
[`What are the advantages/disadvantages of storing derived values?`,``,``,``,``, ``,`<p class='space'>Advantage of storing derived values, ensures the data will be accurate in situations where the values used for the calculation can change, it will also speed processing on queries need a calculation, reduces CPU load.<p class='space'>Disadvantage it takes us additional space to store, requires monitoring to ensure the calculation is correct.`, `IS380-ch04`],
[`How should relational databases implement the following? - Many to Many relationship`,``,``,``,``, ``,`<p class='space'>create a new entity by using a bridging table.`, `IS380-ch04`],
[`How should relational databases implement the following? - Multi-valued attributes`,``,``,``,``, ``,`<p class='space'>either create multiple attributes to cover all possibilities or create a new entity using a bridge table to handle multiple values.`, `IS380-ch04`],
[`What is a weak/non-identifying relationship (how is it depicted in a Crow’s Foot ERD)?`,``,``,``,``, ``,`<p class='space'>A weak relationship, also known as a non-identifying relationship, exists if the primary key of the related entity does not contain a primary key component of the parent entity.<p class='space'>It is depicted in a crow’s foot diagram using a dotted line.`, `IS380-ch04`],
[`What is a strong/identifying relationship (how is it depicted in a Crow’s Foot ERD)?`,``,``,``,``, ``,`<p class='space'>A relationship that occurs when two entities are existence-dependent; from a database design perspective, this relationship exists whenever the primary key of the related entity contains the primary key of the parent entity.<p class='space'>The Crow’s Foot notation depicts the strong (identifying) relationship with a solid line between the entities.`, `IS380-ch04`],
[`What are the differences between existence-dependent and existence-independent entities?`,``,``,``,``, ``,`<p class='space'>Existence dependent means the entity requires a parent to exist.<p class='space'>For example, a dependent cannot exist in an HR database if it is not associated with and employee. Existence independent mean the entity can exist on its own.\nAn entity is said to be existence-dependent if it can exist in the database only when it is associated with another related entity occurrence.`, `IS380-ch04`],
[`What is a weak entity (what two conditions must be met)?`,``,``,``,``, ``,`<p class='space'>An entity that displays <p class='space'>(1) existence dependence and <p class='space'>(2) inherits the primary key of its parent entity as its entire of part of its primary key or\n( the PK of the related entity contains a PK component of the parent entity.}`, `IS380-ch04`],
[`What is a strong entity? Is it the same as a regular entity?`,``,``,``,``, ``,`<p class='space'>An entity that is existence-independent, meaning it can exist apart from all of its related entities. It is also called a regular entity.`, `IS380-ch04`],
[`What is the difference between a composite key and a composite entity?`,``,``,``,``, ``,`<p class='space'>A composite entity is an entity designed to transform an M:N relationship into two 1:M relationships.<p class='space'>The composite entity’s primary key comprises at least the primary keys of the entities that it connects.<p class='space'>Also known as a bridge entity or associative entity or linking table.<p class='space'>A composite key is a key made of multiple attributes within a table. The composite keys and composite entities are not the same.`, `IS380-ch04`],
[`Explain the following in reference to relationships - Connectivity`,``,``,``,``, ``,`<p class='space'>Connectivity is the classification of the relationship between entities.<p class='space'>Classifications include 1:1, 1:M, and M:N`, `IS380-ch04`],
[`Explain the following in reference to relationships - Cardinality`,``,``,``,``, ``,`<p class='space'>Cardinality is a property that assigns a specific value to connectivity and expresses the range of allowed entity occurrences associated with a single occurrence of the related entity.<p class='space'>For example, a student can register for a particular course one and only on time and a student can take one to 5 courses.`, `IS380-ch04`],
[`Explain the following relationships: - Unary`,``,``,``,``, ``,`<p class='space'>A unary relationship is an association within an entity.<p class='space'>For example, an EMPLOYEE might manage another EMPLOYEE both who would show up in an employee table.`, `IS380-ch04`],
[`Explain the following relationships: - Binary`,``,``,``,``, ``,`<p class='space'>A binary relationship is an association (relationship) between two entities, most common type of relationship.`, `IS380-ch04`],
[`Explain the following relationships: - Ternary`,``,``,``,``, ``,`<p class='space'>A ternary relationship is an association (relationship) between three entities.`, `IS380-ch04`],
[`What is normalization? Why do it?`,``,``,``,``, ``,`<p class='space'>Normalization is designing tables to minimize if not eliminate data redundancies.`, `IS380-ch04`],
[`Are there any disadvantages to normalization?`,``,``,``,``, ``,`<p class='space'>The more normalized the data the more likelihood the complex relational join will be required.<p class='space'>For a large database this will likely be cpu intensive and take some time.<p class='space'>This could be reduced if some data isn’t at the highest level of normalization.`, `IS380-ch04`],
[`What is denormalization? Why do it?`,``,``,``,``, ``,`<p class='space'>Denormalization is a process by which a table is changed from a higher-level normal form to a lower-level normal form.<p class='space'>It may be considered to improve the processing speed for complex or common queries.`, `IS380-ch04`],
[`If a table is in 1NF and contains a single attribute primary key, why is it automatically also in 2NF?`,``,``,``,``, ``,`<p class='space'>If a table is in 1NF and includes only a single attribute key, there can be not partial dependencies because the primary key cannot be subdivided any lower.`, `IS380-ch04`],
[`What is a surrogate key?`,``,``,``,``, ``,`<p class='space'>A surrogate key is a system-assigned primary key, generally numeric and auto-incremented.<p class='space'>The surrogate key has no meaning in the user’s environment—it exists only to distinguish one entity instance from another (just like any other primary key).`, `IS380-ch04`],
[`Suppose someone tells you that an attribute that is part of a composite primary key is also a candidate key. How would you respond to that statement?`,``,``,``,``, ``,`<p class='space'>I would say it is not a candidate key because A candidate key is a minimal superkey, in other words a superkey without any unnecessary attributes.<p class='space'>In this case since it is a part of a composite key that isn’t true.`, `IS380-ch04`],
[`What is A derived attribute?`,``,``,``,``, ``,`<p class='space'>Derived – A derived attribute is one that is calculated from 1 or more other attributes.`, `IS380-ch04`],
[`What are the advantages/disadvantages of storing derived values?`,``,``,``,``, ``,`<p class='space'>Ensures historical data is maintained, data will be accurate in situations where the values used for the calculation can change, it will also speed processing on queries need a calculation, reduces CPU load. <p class='space'>Disadvantage it takes us additional space to store, requires monitoring to ensure the calculation is correct.`, `IS380-ch04`],
[`The term optionality is used to:`,``,``,``,``, ``,`\nThe term optionality is used to label any condition in which one or more optional relationships exist.\nMandatory participation means that one entity occurrence requires a corresponding entity occurrence in a particular relationship.\nIf no optionality symbol is depicted with the entity, the entity is assumed to exist in a mandatory relationship with the related entity. If the mandatory participation is depicted graphically, it is typically shown as a small hash mark across the relationship line, similar to the Crow’s Foot depiction of a connectivity of 1.\nThe existence of a mandatory relationship indicates that the minimum cardinality is at least 1 for the mandatory entity.`, `IS380-ch04`],
[`What is first step in database design?`,``,``,``,``, ``,`<p class='space'>Data modeling is the first step in the database design journey`, `IS380-ch04`]
[`Conceptual vs relational models`,``,``,``,``, ``,`<p class='space'>Conceptual models are used in the conceptual design of databases, while<p class='space'>relational models are used in the logical design of databases.`, `IS380-ch04`],
[`Entity vs entity instance`,``,``,``,``, ``,`<p class='space'>an entity in the ERM corresponds to a table, not to a row, in the relational environment. <p class='space'>The ERM refers to a table row as an entity instance or entity occurrence.`, `IS380-ch04`],
[`What is a schema:`,``,``,``,``, ``,`<p class='space'>A logical grouping of database objects, such as tables, indexes, views, and queries, that are related to each other. Usually, a schema belongs to a single user or application.  `, `IS380-ch04`],
[`Purpose of ERD\Process followed`,``,``,``,``, ``,`<p class='space'>the ERD is used for communication between designers and end users.<p class='space'>The process of database design is iterative rather than a linear or sequential process<p class='space'>`, `IS380-ch04`],
[`What is UML:`,``,``,``,``, ``,`<p class='space'>Unified Modeling Language (UML) is a general-purpose, developmental, modeling language in the field of software engineering that is intended to provide a standard way to visualize the design of a system.`, `IS380-ch04`],
[`What is an atomic attribute? `,``,``,``,``, ``,`<p class='space'>An attribute that cannot be further subdivided to produce meaningful components. <p class='space'>For example, a person’s last name attribute cannot be meaningfully subdivided. `, `IS380-ch06`],
[`denormalization `,``,``,``,``, ``,`<p class='space'>A process by which a table is changed from a higher-level normal form to a lower-level normal form, usually to increase processing speed.<p class='space'>Denormalization potentially yields data anomalies.`, `IS380-ch06`],
[`determinant`,``,``,``,``, ``,`<p class='space'>Any attribute in a specific row whose value directly determines other values in that row.`, `IS380-ch06`],
[`first normal form (1NF) `,``,``,``,``, ``,`<p class='space'>The first stage in the normalization process.<p class='space'>It describes a relation depicted in tabular format, with no repeating groups and a primary key identified.<p class='space'>All nonkey attributes in the relation are dependent on the primary key. `, `IS380-ch06`],
[`second normal form (2NF) `,``,``,``,``, ``,`<p class='space'>The second stage in the normalization process, in which a relation is in 1NF and there are no partial dependencies (dependencies in only part of the primary key).  `, `IS380-ch06`],
[`third normal form (3NF) `,``,``,``,``, ``,`<p class='space'>A table is in 3NF when it is in 2NF and no nonkey attribute is functionally dependent on another nonkey attribute; that is, it cannot include transitive dependencies. contain  `, `IS380-ch06`],
[`transitive dependency `,``,``,``,``, ``,`<p class='space'>A condition in which an attribute is dependent on another attribute that is not part of the primary key. `, `IS380-ch06`],
[`prime attribute `,``,``,``,``, ``,`<p class='space'>A key attribute; that is, an attribute that is part of a key or is the whole key. See also key attributes. `, `IS380-ch06`],
[`partial dependency `,``,``,``,``, ``,`<p class='space'>A condition in which an attribute is dependent on only a portion (subset) of the primary key. `, `IS380-ch06`],
[`granularity`,``,``,``,``, ``,`<p class='space'>The level of detail represented by the values stored in a table’s row.<p class='space'>Data stored at its lowest level of granularity is said to be atomic data.`, `IS380-ch06`],
[`key attribute `,``,``,``,``, ``,`<p class='space'>The attributes that form a primary key. See also prime attribute.`, `IS380-ch06`],
[`nonkey attribute`,``,``,``,``, ``,`<p class='space'>also called a nonprime attribute<p class='space'>An attribute that is not part of a key. `, `IS380-ch06`],
[`normalization`,``,``,``,``, ``,`<p class='space'>A process that assigns attributes to entities so that data redundancies are reduced or eliminated. `, `IS380-ch06`],
[`dependency diagram`,``,``,``,``, ``,`<p class='space'>A representation of all data dependencies (primary key, partial, or transitive) within a table.`, `IS380-ch06`],
[`atomicity`,``,``,``,``, ``,`<p class='space'>Not being able to be divided into smaller units.  `, `IS380-ch06`],
[`unnormalized data `,``,``,``,``, ``,`<p class='space'>Raw data in its original state; it might contain redundant data, mul-tivalued data, and/or other data anomalies not found on normalized data relations.`, `IS380-ch06`],
[`What is a simple attribute?`,``,``,``,``, ``,`<p class='space'>A simple attribute is an attribute that cannot be subdivided<p class='space'>For example, age, sex, and marital status would be classified as simple attributes.`, `IS380-ch06`],
[`What is a Composite attribute?`,``,``,``,``, ``,`<p class='space'>Composite - An attribute that can be further subdivided to yield additional attributes.<p class='space'>For example, the attribute ADDRESS can be subdivided into street, city, state, and zip code.`, `IS380-ch06`],
[`What is a Single-value attribute? `,``,``,``,``, ``,`<p class='space'>Single-value - A single-valued attribute is an attribute that can have only a single value<p class='space'>Keep in mind that a single-valued attribute is not necessarily a simple attribute. For instance, a part’s serial number (such as SE-08-02-189935) is single-valued, but it is a composite attribute because it can be sub-divided into the region in which the part was produced (SE), the plant within that region (08), the shift within the plant (02), and the part number (189935).`, `IS380-ch06`],
[`What is a Multi-valued  attribute?`,``,``,``,``, ``,`<p class='space'>Multi-valued - An attribute that can have many values for a single entity occurrence. <p class='space'>For example, an EMP_ DEGREE attribute might store the string “BBA, MBA, PHD” to indicate three degrees.<p class='space'>Although the conceptual model can handle MANY TO MANY relationships and multivalued attributes, you should not implement them in the RDBMS.`, `IS380-ch06`],
[`How should relational databases implement a Many to Many relationship?`,``,``,``,``, ``,`<p class='space'>Create a new entity by using a bridging table.`, `IS380-ch06`],
[`How should relational databases implement a Multi-valued attribute?`,``,``,``,``, ``,`<p class='space'>(1)create multiple attributes to cover all possibilities<p class='space'>(2)Create a new entity composed of the original multivalued attribute’s components. This new entity allows the designer to define color for different sections of the car (see Table 4.1). Then, this new CAR_COLOR entity is related to the original CAR entity in a 1 to many relationship.`, `IS380-ch06`],
[`If a table is in 1NF and contains a single attribute primary key, why is it automatically also in 2NF?`,``,``,``,``, ``,`<p class='space'>If a table is in 1NF and includes only a single attribute key, there can be not partial dependencies because the primary key cannot be subdivided any lower.`, `IS380-ch06`],
[`What three data anomalies are likely to be the result of data redundancy? How can such anomalies be eliminated?`,``,``,``,``, ``,`<p class='space'>(1) Update anomalies,\n(2) Insertion anomalies\n(3) Deletion anomalies.<p class='space'>They can be eliminated by adequately normalizing the database.`, `IS380-ch06`],
[`Suppose someone tells you that an attribute that is part of a composite primary key is also a candidate key. How would you respond to that statement?`,``,``,``,``, ``,`<p class='space'>I would say it is not a candidate key because A candidate key is a minimal superkey, in other words a superkey without any unnecessary attributes. In this case since it is a part of a composite key that isn’t true.`, `IS380-ch06`],
[`What is the difference between a composite key and a composite entity?`,``,``,``,``, ``,`<p class='space'>A composite entity is an entity designed to transform an M:N relationship into two 1:M relationships. <p class='space'>The composite entity’s primary key comprises at least the primary keys of the entities that it connects. Also known as a bridge entity or associative entity or linking table.<p class='space'>A composite key is a key made of multiple attributes within a table. The composite keys and composite entities are not the same.`, `IS380-ch06`],
[`Connectivity is:`,``,``,``,``, ``,`<p class='space'>Connectivity is the classification of the relationship between entities. <p class='space'>Classifications include 1:1, 1:M, and M:N.`, `IS380-ch06`],
[`Cardinality is:`,``,``,``,``, ``,`<p class='space'>Cardinality is a property that assigns a specific value to connectivity and expresses the range of allowed entity occurrences associated with a single occurrence of the related entity. <p class='space'>For example, a student can register for a particular course one and only on time and a student can take one to 5 courses.\nCrow’s Foot modeling notation do not depict the specific cardinalities on the ER diagram itself because the specific limits described by the cardinalities cannot be implemented directly through the database design.`, `IS380-ch06`],
[`Explain the following relationship degree: Binary`,``,``,``,``, ``,`A binary relationship is an association (relationship) between two entities, most common type of relationship.`, `IS380-ch06`],
[`Explain the following relationship degree:  Unary`,``,``,``,``, ``,`A unary relationship is an association within an entity. For example, an EMPLOYEE might manage another EMPLOYEE both who would show up in an employee table.`, `IS380-ch06`],
[`Explain the following relationship degree:  Ternary`,``,``,``,``, ``,`A ternary relationship is an association (relationship) between three entities.`, `IS380-ch06`],
[`What is normalization? Why do it?`,``,``,``,``, ``,`<p class='space'>Normalization is designing tables to minimize if not eliminate data redundancies.`, `IS380-ch06`],
[`Are there any disadvantages to normalization?`,``,``,``,``, ``,`<p class='space'>The more normalized the data the more likelihood the complex relational join will be required. <p class='space'>For a large database this will likely be cpu intensive and take some time. This could be reduced if some data isn’t at the highest level of normalization.`, `IS380-ch06`],
[`What is denormalization? Why do it?`,``,``,``,``, ``,`<p class='space'>Denormalization is a process by which a table is changed from a higher-level normal form to a lower-level normal form. It may be considered to improve the processing speed for complex or common queries.`, `IS380-ch06`],
[`What is 1NF?`,``,``,``,``, ``,`<p class='space'>1NF, means first normal from. This means the data is in table format, and there are no repeating groups, and the primary keys has been identified`, `IS380-ch06`],
[`What is 2NF?`,``,``,``,``, ``,`<p class='space'>Second normal form (2NF), which means the data is 1NF and there are no partial dependencies`, `IS380-ch06`],
[`What is 3NF?`,``,``,``,``, ``,`<p class='space'>Third normal form (3NF), which means 2NF and no transitive dependencies`, `IS380-ch06`],
[`What is a partial dependency?`,``,``,``,``, ``,`<p class='space'>A partial dependency is a condition in which an attribute is dependent on only a portion (subset) of the primary key.`, `IS380-ch06`],
[`DML`,``,``,``,``, ``,`<p class='space'>data manipulation language (DML).<p class='space'>SQL is a DML- it includes commands to insert, update, delete data within the database tables. `, `IS380-CH7`],
[`DDL`,``,``,``,``, ``,`<p class='space'>Data definition language (DDL). <p class='space'>SQL includes commands to create database objects (CREATE, ALTER, DROP, RENAME, TRUNCATE) such as tables, indexes, and views, as well as commands to define access rights to those database objects.`, `IS380-CH7`],
[`DQL`,``,``,``,``, ``,`<p class='space'>Date Query Language<p class='space'>Documentum Query Language (DQL) is a language to query Documentum content management system. This, we use to create, manage, deliver, and archive all type of contents from text documents and spreadsheets to digital images, HTML, and XML components.<p class='space'>SELECT`, `IS380-CH7`],
[`TCL`,``,``,``,``, ``,`<p class='space'>Transaction Control Language (TCL) - COMMIT, ROLLBACK, SAVEPOINT `, `IS380-CH7`],
[`DCL`,``,``,``,``, ``,`<p class='space'>Data Control Language (DCL) - GRANT, REVOKE -<p class='space'>used to control access to database objects. `, `IS380-CH7`],
[`SQL`,``,``,``,``, ``,`<p class='space'>Structured Query Language<p class='space'>Its basic command set has a vocabulary of fewer than 100 words.<p class='space'>ANSI SQL standard`, `IS380-CH7`],
[`Three fundament types of data`,``,``,``,``, ``,`<p class='space'>character data, <p class='space'>numeric data,<p class='space'>date data.`, `IS380-CH7`],
[`alias `,``,``,``,``, ``,`<p class='space'>An alternative name for a column or table in a SQL statement.<p class='space'>Using a table alias allows the database programmer to improve the maintainability of the code by using a table alias that is descriptive of what data the table is providing within the query.  `, `IS380-CH7`],
[`A computed column`,``,``,``,``, ``,`<p class='space'>A computed column (also called a calculated column) represents a derived attribute,  `, `IS380-CH7`],
[`natural join`,``,``,``,``, ``,`<p class='space'>natural join returns all rows with matching values in the matching columns and eliminates duplicate columns.`, `IS380-CH7`],
[`outer join returns?`,``,``,``,``, ``,`<p class='space'>outer join returns not only the rows matching the join condition (that is, rows with matching values in the common columns), but it also returns the rows with unmatched values. <p class='space'>The ANSI standard defines three types of outer joins: left, right, and full. <p class='space'>The left and right designations reflect the order in which the tables are processed by the DBMS. <p class='space'>Remember that join operations take place two tables at a time. <p class='space'>The first table named in the FROM clause will be the left side, and the second table named will be the right side.  `, `IS380-CH7`],
[`cross join`,``,``,``,``, ``,`<p class='space'>cross join performs a relational product (also known as the Cartesian product) of two tables`, `IS380-CH7`],
[`recursive query `,``,``,``,``, ``,`<p class='space'>recursive query<p class='space'>A query that joins a table to itself. `, `IS380-CH7`],
[`WHERE`,``,``,``,``, ``,`<p class='space'>where<p class='space'>A SQL clause that adds conditional restrictions to a SELECT statement that limit the rows returned by the query `, `IS380-CH7`],
[`boolean algebra`,``,``,``,``, ``,`<p class='space'>boolean algebra<p class='space'>is dedicated to the use of logical operators`, `IS380-CH7`]
[`The number of join conditions `,``,``,``,``, ``,`<p class='space'>is always equal to the number of tables being joined minus one.`, `IS380-CH7`],
[`What does  separation of responsibilities mean when applied to joins?`,``,``,``,``, ``,`<p class='space'>Having a clear separation of responsibilities among the SELECT query clauses makes code maintenance easier. <p class='space'>With JOIN ON or JOIN USING syntax, all of the code necessary to join the tables together is located in the FROM clause. All of the code necessary to restrict the data based on business requirements is located in the WHERE clause. With an old-style join, the criteria for completing the join are mixed with the criteria to restrict the data based on business requirements. Second, the old-style join is susceptible to undetected errors that other joins are not.`, `IS380-CH7`],
[`NULL `,``,``,``,``, ``,`<p class='space'>NULL is not a “value” the way the number 0 or the blank space is; instead, a NULL is a special property of an attribute that represents the absence of any value.\The use of the IS NULL operator is useful in many situations. For example, it is often used to find unmatched rows, as shown in Figure 7.32. `, `IS380-CH7`],
[`COUNT`,``,``,``,``, ``,`<p class='space'>Count, A SQL aggregate function that outputs the number of rows containing not null values for a given column or expression, sometimes used in conjunction with the DISTINCT clause`, `IS380-CH7`],
[`correlated subquery`,``,``,``,``, ``,`<p class='space'>correlated subquery A subquery that executes once for each row in the outer query.`, `IS380-CH7`],
[`EXISTS`,``,``,``,``, ``,`<p class='space'>EXISTS In SQL, a comparison operator that checks whether a subquery returns any rows`, `IS380-CH7`]

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
