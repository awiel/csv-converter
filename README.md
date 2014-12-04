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
	$ node simpleCsv2Csv input.csv output.csv

##Options:
Edit the javascript file to change one of these options:

	var options = {
		inputSeparator: 	'|',  // csv column separator
		outputSeparator: 	'|',  // csv column separator
		primaryKeyColumn:	0,    // column that contains primary key, 0=first column
		secondaryKeyColumn:	1,  // column that contains secondary key, 0=first column
		columnsFromHeader:	false // true when first record contains columnlabels
	}

##Example for simpleCsv2Csv.js
Input csv contains:

	12345|AAA|123,11|7263,11|bbb|zz1
	12345|BBB|123,12|7263,11|bbb|zz2
	12346|AAA|123,22|7263,11|bbb|zz21
	12346|ZZZ|123,26|7263,11|bbb|zz25

results:

	12345|AAA|123,11|7263,11|bbb|zz1|BBB|123,12|7263,11|bbb|zz2|ZZZ|||||||
	12346|AAA|123,22|7263,11|bbb|zz21|BBB|||||||ZZZ|123,26|7263,11|bbb|zz25|

log:

	Verwerk file input.csv naar output.csv
	Einde verwerking file input.csv (4 records)  naar output.csv (2 records)

##Changelog
- v0.0.1 - there is always a first step

##License
- CSV-converter is licensed under the GNU General Public License 3.

