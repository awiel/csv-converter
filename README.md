CSV-converter
===================

Conversion tools for csv files, e.g. reorganized csv content for analyse purpose, use in statistic applications like SPSS.

* simpleCsv2Csv.js	
	'simple' conversion from 'n'-records with same primary key and one secondary key per record into one record for each distinct primary key extended with all possible secondary keys (see example). All primary and secondary keys wil be sorted asc.  

##Requests/issues:
Send me a request if you want more than is already available, or register your issue.

##Disclaimer:
Always check the results. Use this software as is and at your own risk. Tool is not tested with large amounts of data or on your configuration ;-) 

##Install:
	# create a workfolder
	# cd into workfolder
	$ npm install nodejs 	# (nodejs can be installed globally with option '-g' !)
	$ npm install ya-csv

##Run:
	# cd into workfolder
	# copy input dataset into workfolder (e.g. input.csv)
	$ node simpleCsv2Csv option.txt input.csv output.csv

##Options:
Edit the option file to change one of these options:

 "inputSeparator": ";"
 "outputSeparator": ";"
 "primaryKeyColumn":	1 // 1=first column
 "secondaryKeyColumn": 2 // 1=first column
 "columnsFromHeader": false
 "primaryKeyName": "BSN"
 "action": "countsec"   // countsec=count secundairy; ''=column grouping of secundaryKeyColumn 


##Example for simpleCsv2Csv.js
Input csv contains:

	Bsn  ;cat;bdr1;  bdr2;
	12345;AAA;123,11;7263,11
	12345;BBB;123,12;7263,11
	12346;AAA;123,22;7263,11
	12346;ZZZ;123,26;7263,11

results for option action='':

	12345;AAA;123,11;7263,11;BBB;123,12;7263,11;ZZZ;      ;       ;
	12346;AAA;123,22;7263,11;BBB;      ;       ;ZZZ;123,26;7263,11;

results for option action='cs':

	BSN ;AAA;BBB;ZZZ;Total
	12345  ;  1;  1;  0; 2
	12346  ;  1;  0;  1; 2

log:

	Verwerk file input.csv naar output.csv
	Einde verwerking file input.csv (4 records)  naar output.csv (2 records)

##Changelog
- v0.1.0 - 'cs' action ; option file
- v0.0.1 - there is always a first step

##License
- CSV-converter is licensed under the GNU General Public License 3.

