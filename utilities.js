jQuery.fn.dataTableExt.aTypes.push(
    function ( sData )
    {

        var x = sData.substring(0, sData.length - 2); 
        /* Check prefixed by currency */
        if ( x == 'kn' )
        {
            return 'currency';
        }
		var dots = sData.split('.');
		if(sData.length == 10 && dots.length == 2) return 'datum';		
        return null;
    }
);

jQuery.fn.dataTableExt.oSort['datum-desc'] = function(a,b) {	
    x = stringToDate(a);
    y = stringToDate(b);
    return x - y;
};

jQuery.fn.dataTableExt.oSort['datum-asc'] = function(a,b) {
    x = stringToDate(a);
    y = stringToDate(b);
    return y -x;
};
 
jQuery.fn.dataTableExt.oSort['currency-desc'] = function(a,b) {

	if((a.replace && a.replace()) && (b.replace && b.replace()))
	{
	/* Remove any commas (assumes that if present all strings will have a fixed number of d.p) */
	var x =  a.replace(".", "").replace(",", ".").replace(" kn","");
	var y =  b.replace(".", "").replace(",", ".").replace(" kn","");
    x = parseFloat( x );
    y = parseFloat( y );
    return y - x;
	}
};

jQuery.fn.dataTableExt.oSort['currency-asc'] = function(a,b) {

	if((a.replace && a.replace()) && (b.replace && b.replace()))
	{
	/* Remove any commas (assumes that if present all strings will have a fixed number of d.p) */
	var x =  a.replace(".", "").replace(",", ".").replace(" kn","");
	var y =  b.replace(".", "").replace(",", ".").replace(" kn","");
    x = parseFloat( x );
    y = parseFloat( y );
    return x - y;
	}
};

function fnFilterColumn ( regex, i, table )
{
    $(table).dataTable().fnFilter( 
        regex,
        i, 
        true, 
        false
    );
}

$.fn.dataTableExt.oApi.fnFindCellRowIndexes = function ( oSettings, sSearch, iColumn )
{
    var
        i,iLen, j, jLen,
        aOut = [], aData;
      
    for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
    {
        aData = oSettings.aoData[i]._aData;
          
        if ( typeof iColumn == 'undefined' )
        {
            for ( j=0, jLen=aData.length ; j<jLen ; j++ )
            {
                if ( aData[j] == sSearch )
                {
                    aOut.push( i );
                }
            }
        }
        else if ( aData[iColumn] == sSearch )
        {
            aOut.push( i );
        }
    }
      
    return aOut;
};

function findRowIndexesUsingString(oTable, stringToCheckFor,column){
    var rowIndexes = new Array();
    $.each(oTable.fnGetData(), function(i, dtRow) {
		if(dtRow[column] == stringToCheckFor) rowIndexes.push();
    });
    return rowIndexes;
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function currencyToFloat(currency)
{
	var amount = parseFloat(currency.replace(".","").replace(",",".").replace(" kn",""));
	return amount;
}

function isCurrentYear(date)
{	
	var year = parseInt(date.substring(date.length-4,date.length));
	var date2 = new Date();
	var thisYear = date2.getFullYear();
	if (thisYear == year) return true;
	else return false;
}

function isCurrentYear2(year)
{	
	var date2 = new Date();
	var thisYear = date2.getFullYear();
	if (thisYear == year) return true;
	else return false;
}

function getYearFromString(date)
{
	var year = parseInt(date.substring(date.length-4,date.length));
	return year;
}

function stringToDate(input)
{
	var year = parseInt(input.substr(6,4));
	var month = parseInt(input.substr(3,2))-1;
	var day = parseInt(input.substr(0,2));
	var date = new Date(year,month,day);
	return date;
}

function encode(text)
{
	if(text.indexOf('æ') > -1){
		text = text.replace('æ','%u0107');
	}else if(text.indexOf('Æ') > -1){
		text = text.replace('Æ','%u0106');
	
	}else if(text.indexOf('È') > -1){
		text = text.replace('È','%u010C');
	}else if(text.indexOf('è') > -1){
		text = text.replace('è','%u010C');
		
	}else if(text.indexOf('Ž') > -1){
		text = text.replace('Ž','%u017D');		
	}else if(text.indexOf('ž') > -1){
		text = text.replace('ž','%u017E');

	}else if(text.indexOf('Š') > -1){
		text = text.replace('Š','%u0160');		
	}else if(text.indexOf('š') > -1){
		text = text.replace('š','%u0161');

	}else if(text.indexOf('Ð') > -1){
		text = text.replace('ð','%u0110');		
	}else if(text.indexOf('ð') > -1){
		text = text.replace('ð','%u0111');			
	}
	
	return text;
}