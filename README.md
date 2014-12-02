3D-SocialTransition
===================

Tool for 3 decentralisaties. Tool converts csv into reorganized csv files for analyse purpose.

Voor conversie van bestanden die gemeenten ontvangen tbv de 3 decentralisaties. Bestanden in csv formaat worden geschikt gemaakt voor gebruik in SPSS of ander statistiek programma. 

##Requests:
Send me a request if you want more than is already available. :-)

##Disclaimer:
Always check the results.

##Install:
* npm install nodejs
* npm install ya-csv

##Run:
	$ node simpleCsv2Csv input.csv output.csv

##Options:
Edit the javascript file to change one of these options:

	var options = {
		inputSeparator: 	';',  // csv column separator
		outputSeparator: 	';',  // csv column separator
		primaryKeyColumn:	0,    // column that contains primary key, 0=first column
		secondaryKeyColumn:	1,  // column that contains secondary key, 0=first column
		columnsFromHeader:	false // true when first record contains columnlabels
	}

##Example
Input csv contains:

	12345;AAA;123,11;7263,11;bbb;zz1
	12345;BBB;123,12;7263,11;bbb;zz2
	12346;AAA;123,22;7263,11;bbb;zz21
	12346;ZZZ;123,26;7263,11;bbb;zz25

results:

	12345;AAA;123,11;7263,11;bbb;zz1;BBB;123,12;7263,11;bbb;zz2;ZZZ;;;;;;;
	12346;AAA;123,22;7263,11;bbb;zz21;BBB;;;;;;;ZZZ;123,26;7263,11;bbb;zz25;

log:

	Verwerk file input.csv naar output.csv
	Einde verwerking file input.csv (4 records)  naar output.csv (2 records)

##Changelog
- v0.0.1 - there is always a first step

##License
- 3D-SocialTransition is licensed under the GNU General Public License 3.

