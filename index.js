
console.log("Verwerk file " + process.argv[3] + " naar " + process.argv[4] + " options: " +  process.argv[2] );

/*
var option = {
	inputSeparator: 	';',
	outputSeparator: 	';',
	primaryKeyColumn:	1, // 1=first column
	secondaryKeyColumn:	2, // 1=first column
	columnsFromHeader:	false,
	primaryKeyName:		'BSN',
	action:			'cs'   // cs=count secundairy; ''=column grouping of secundaryKeyColumn 
}
*/

var counter				= 0;

var fs 					= require('fs');
var csv 				= require('ya-csv');

var optionFileLocalPath	= './';
var optionFileName 		= process.argv[2];
var inputFileLocalPath 	= './';
var inputFileName 		= process.argv[3];
var outputFileLocalPath = './';
var outputFileName 		= process.argv[4];

var optionFile = "" + fs.readFileSync(optionFileLocalPath + optionFileName);
//console.log('options: ' + optionFile);
var optionFileRecords = optionFile.split('\r\n');
var optionRecord;
var optionJson = "{";
for (i=0;i<optionFileRecords.length;i++) {
	//console.log('Option: ' + optionFileRecords[i] );
	optionRecord = optionFileRecords[i].split('//');
	console.log('Option: ' + optionRecord[0] );
	optionJson = optionJson + " " + optionRecord[0];
	if (i<optionFileRecords.length-1) optionJson = optionJson + ",";	
}
optionJson = optionJson + "}";
//console.log(optionJson);
var option = JSON.parse(optionJson);
		 
var csvReader = csv.createCsvFileReader(inputFileLocalPath + inputFileName,
	 {columnsFromHeader:option.columnsFromHeader,
	  'separator': 		option.inputSeparator
	  });

var primaryKeyHash 		= {};
var primaryKeyArray 		= [];
var primaryKeyArraySorted	= [];
var _primaryKeyColumn		= option.primaryKeyColumn-1;  // zero based array

var secondaryKeyHash		= {};
var secondaryKeyArray		= [];
var secondaryKeyArraySorted	= [];
var _secondaryKeyColumn		= option.secondaryKeyColumn-1;  // zero based array

var tmpRecordsArray			= [];

var skipFirstRecord 		= true;


csvReader.addListener('data', function(data){
	if (skipFirstRecord == true) {
		skipFirstRecord = false;
	} else {
		//console.log('PrimaryKey:   ' + _primaryKeyColumn + ' ' + data[_primaryKeyColumn] );
		//console.log('SecondaryKey: ' + _secondaryKeyColumn + ' ' + data[_secondaryKeyColumn] );
		var _primaryKey 	= data[_primaryKeyColumn];
		//console.log('Primary key of datarecord: ' + _primaryKey + ' next column: ' + data[_primaryKeyColumn+1] );
		if (primaryKeyHash[_primaryKey]==undefined) {  // new key? 
			primaryKeyHash[_primaryKey] = data[_primaryKeyColumn];
			primaryKeyArray.push(data[_primaryKeyColumn]);
		}
		var _secondaryKey 	= data[_secondaryKeyColumn];
		if (secondaryKeyHash[_secondaryKey]==undefined) {  // new key?
			secondaryKeyHash[_secondaryKey] = data[_secondaryKeyColumn];
			secondaryKeyArray.push(data[_secondaryKeyColumn]);
		}
	
		var _tmpRecord = data;
		tmpRecordsArray.push(_tmpRecord);
		//console.log('data: ' + _tmpRecord );
	}
});

csvReader.addListener('end', function(){

	var i,j,k,l,l2;
	var outRecord="";
	var tmpRecord;
	primaryKeyArraySorted = primaryKeyArray.sort();
	secondaryKeyArraySorted = secondaryKeyArray.sort();
	
	if (option.action == 'countsec' ) {
	    console.log('Action: ' + option.action);	
	    tmpRecord = "";
	    tmpRecord += option.primaryKeyName + option.outputSeparator;
	    for (j=0;j<secondaryKeyArraySorted.length;j++) {
	    	tmpRecord += secondaryKeyArraySorted[j] + option.outputSeparator;
	    }
	    tmpRecord += 'Total'+ "\r\n";
	    outRecord += tmpRecord;

	    for (i=0;i<primaryKeyArraySorted.length;i++) {
		 tmpRecord = "";
		 tmpRecord += primaryKeyArraySorted[i] + option.outputSeparator;
		 var countArray=[];
		 for (j=0;j<secondaryKeyArraySorted.length;j++) {
			countArray.push(0);
		 }

		 for (j=0;j<secondaryKeyArraySorted.length;j++) {
			//console.log('sec key: ' + secondaryKeyArraySorted[j]);
			var secondaryKeyFound = false;
			for (k=0;k<tmpRecordsArray.length;k++){
				var tmp2Record = tmpRecordsArray[k];
				if (tmp2Record[_primaryKeyColumn] 	== primaryKeyArraySorted[i] && 
				    tmp2Record[_secondaryKeyColumn] 	== secondaryKeyArraySorted[j]) {
					countArray[j]+=1;
				}
			}
		}
		var total = 0;		
		for (j=0;j<secondaryKeyArraySorted.length;j++) {
			total += countArray[j];
			tmpRecord += countArray[j] + option.outputSeparator;
		}
		tmpRecord += '' + total + "\r\n";
		outRecord += tmpRecord;
	    }
	}

	if (option.action == '' ) {
	    for (i=0;i<primaryKeyArraySorted.length;i++) {
		 tmpRecord = "";
		 tmpRecord += primaryKeyArraySorted[i] + option.outputSeparator;
		 for (j=0;j<secondaryKeyArraySorted.length;j++) {
	 		tmpRecord += secondaryKeyArraySorted[j] + option.outputSeparator;
			var secondaryKeyFound = false;
			for (k=0;k<tmpRecordsArray.length;k++){
				var tmp2Record = tmpRecordsArray[k];
				if (tmp2Record[_primaryKeyColumn] 	== primaryKeyArraySorted[i] && 
					tmp2Record[_secondaryKeyColumn] 	== secondaryKeyArraySorted[j]) {
					secondaryKeyFound = true;
					for (l=0;l<tmp2Record.length;l++) {
						if (l!=_primaryKeyColumn && l!= _secondaryKeyColumn) {
							tmpRecord += tmp2Record[l] + option.outputSeparator;
						}
					}
				}
			}
			if (secondaryKeyFound==false) {
				//console.log(tmpRecordsArray[0].length); 
				//console.log(secondaryKeyArray[0].length); 
				for (l2=0;l2<tmpRecordsArray[0].length-2;l2++) {
					tmpRecord += option.outputSeparator;
				}
			}
		}		
		tmpRecord += "\r\n";
		outRecord += tmpRecord;
	    }
	}

	writeFileRecord(outRecord, '.');
	
	//outRecord = JSON.stringify(tmpRecordsArray);
	
	console.log("Einde verwerking file " + process.argv[2] + " (" + tmpRecordsArray.length + " records) " + " naar " + process.argv[3] + " (" + primaryKeyArray.length + " records) " );
});

function writeFileRecord (file, folder ) {

	fs.writeFileSync(outputFileLocalPath + outputFileName , file);
};
