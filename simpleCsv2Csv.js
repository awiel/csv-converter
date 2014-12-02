
console.log("Verwerk file " + process.argv[2] + " naar " + process.argv[3]  );

var options = {
	inputSeparator: 	';',
	outputSeparator: 	';',
	primaryKeyColumn:	0, // 0=first column
	secondaryKeyColumn:	1, // 0=first column
	columnsFromHeader:	false
}

var counter				= 0;

var fs 					= require('fs');
var csv 				= require('ya-csv');

var inputFileLocalPath 	= './';
var inputFileName 		= process.argv[2];
var outputFileLocalPath = './';
var outputFileName 		= process.argv[3];

var csvReader = csv.createCsvFileReader(inputFileLocalPath + inputFileName,
	 {columnsFromHeader:options.columnsFromHeader,
	  'separator': 		options.inputSeparator
	  });

var primaryKeyHash 			= {};
var primaryKeyArray 		= [];
var primaryKeyArraySorted	= [];

var secondaryKeyHash		= {};
var secondaryKeyArray		= [];
var secondaryKeyArraySorted	= [];

var tmpRecordsArray			= [];


csvReader.addListener('data', function(data){
		var _primaryKey 	= data[options.primaryKeyColumn];
		if (primaryKeyHash[_primaryKey]==undefined) {
			primaryKeyHash[_primaryKey] = data[options.primaryKeyColumn];
			primaryKeyArray.push(data[options.primaryKeyColumn]);
		}
		var _secondaryKey 	= data[options.secondaryKeyColumn];
		if (secondaryKeyHash[_secondaryKey]==undefined) {
			secondaryKeyHash[_secondaryKey] = data[options.secondaryKeyColumn];
			secondaryKeyArray.push(data[options.secondaryKeyColumn]);
		}
	
		var _tmpRecord = data;
		tmpRecordsArray.push(_tmpRecord);	
});

csvReader.addListener('end', function(){
	var i,j,k,l,l2;
	var outRecord="";
	var tmpRecord;
	primaryKeyArraySorted = primaryKeyArray.sort();
	secondaryKeyArraySorted = secondaryKeyArray.sort();
	
	for (i=0;i<primaryKeyArraySorted.length;i++) {
		tmpRecord = "";
		tmpRecord += primaryKeyArraySorted[i] + options.outputSeparator;
		for (j=0;j<secondaryKeyArraySorted.length;j++) {
			tmpRecord += secondaryKeyArraySorted[j] + options.outputSeparator;
			var secondaryKeyFound = false;
			for (k=0;k<tmpRecordsArray.length;k++){
				var tmp2Record = tmpRecordsArray[k];
				if (tmp2Record[options.primaryKeyColumn] 	== primaryKeyArraySorted[i] && 
					tmp2Record[options.secondaryKeyColumn] 	== secondaryKeyArraySorted[j]) {
					secondaryKeyFound = true;
					for (l=0;l<tmp2Record.length;l++) {
						if (l!=options.primaryKeyColumn && l!= options.secondaryKeyColumn) {
							tmpRecord += tmp2Record[l] + options.outputSeparator;
						}
					}
				}
			}
			if (secondaryKeyFound==false) {
				for (l2=0;l2<tmpRecordsArray[0].length;l2++) {
					tmpRecord += options.outputSeparator;
				}
			}
		}		
		tmpRecord += "\n";
		outRecord += tmpRecord;
	}

	writeFileRecord(outRecord, '.');
	
	outRecord = JSON.stringify(tmpRecordsArray);
	
	console.log("Einde verwerking file " + process.argv[2] + " (" + tmpRecordsArray.length + " records) " + " naar " + process.argv[3] + " (" + primaryKeyArray.length + " records) " );
});

function writeFileRecord (file, folder ) {

	fs.writeFileSync(outputFileLocalPath + outputFileName , file);
};
