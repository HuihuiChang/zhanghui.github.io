function dateFormatValue(value) {
	if (value <= 9) {
		return "0" + value;
	} else {
		return value;
	}
}

//转换成 2012-05-11 11:20:20的格式		长时间格式
function dateFormat2TimeString(date) {
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " " + dateFormatValue(date.getHours()) + ":" + dateFormatValue(date.getMinutes()) + ":" + dateFormatValue(date.getSeconds());
	return str;
}

//转换成 2012-05-11 11:20的格式		长时间格式
function dateFormat2MinString(date) {
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " " + dateFormatValue(date.getHours()) + ":" + dateFormatValue(date.getMinutes());
	return str;
}

//转换成 2012-05-11 的格式		短时间格式
function dateFormat2DateString(date) {
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
	return str;
}

//转换成 2012-05 的格式		短时间格式
function dateFormat2MonthString(date) {
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1);
	return str;
}

//转换成 05-11的格式		长时间格式
function dateFormat2MonthDateString(date) {
    var str = dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
    return str;
}

function dateCurrentTimeString() {
	var date = new Date();
	return dateFormat2TimeString(date);	
}

//今天
function dateCurrentDateString() {
	var date = new Date();
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
	return str;	
}

//昨天
function dateYarDateString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-1);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
	return str;	
}

function dateWeekDateString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-6);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
	return str;	
}

function dateMonthDateString() {
	var day = dateGetLastMonth();
	var date =dateGetNextMulDay(day,1);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
	return str;	
}

function dateCurrentMonthString() {
	var date = new Date();
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1);
	return str;	
}

//返回今天的0点开始的时间，如2012-04-05 00:00:00
function dateCurDateBeginString() {
	var date = new Date();
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//获取当前的时间  如2012-04-05 12:02:05
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


//返回今天的0点开始的时间，如2012-04-05 23:59:59
function dateCurDateEndString() {
	var date = new Date();
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 23:59:59";
	return str;	
}

//返回昨天的0点开始的时间，如2012-04-05 00:00:00
function dateYarDateBeginString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-1);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回昨天的0点开始的时间，如2012-04-05
function dateYarBeginString() {
    var day = new Date();
    var date =dateGetNextMulDay(day,-1);
    var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
    return str;
}

//返回前天的0点开始的时间，如2012-04-05 00:00:00
function dateYarStaDateBeginString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-2);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回前天的0点开始的时间，如2012-04-05
function dateYarStaBeginString() {
    var day = new Date();
    var date =dateGetNextMulDay(day,-2);
    var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate());
    return str;
}

//返回一周内的0点开始的时间，如2012-04-05 00:00:00
function dateWeekDateBeginString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-6);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回一周内的前一天0点开始的时间，如2012-04-05 00:00:00
function dateYarWeekDateBeginString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-7);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回三个月的0点开始的时间，如2012-04-05 00:00:00
function dateThreeBeginString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-89);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回6个月的0点开始的时间，如2012-04-05 00:00:00
function dateSixBeginString() {
	var day = new Date();
	var date =	dateGetNextMulMonth(day, -6);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

/*function getYearMonthDayOnly(strDate) {
	if(!strDate && strDate != '') {
		return null;
	}
	var dateStrArr = strDate.split(" ");
	return dateStrArr[0];
}*/


//返回昨天的23点结束的时间，如2012-04-05 23:59:59
function dateYarDateEndString() {
	var day = new Date();
	var date =dateGetNextMulDay(day,-1);
	var str = date.getFullYear() + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 23:59:59";
	return str;	
}

//返回一年后的今天的0点开始的时间，如2012-04-05 00:00:00
function dateCurDateBeginString2() {
	var date = new Date();
	var str = dateFormatValue(date.getFullYear() + 1) + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回一个月前的今天的下一天0点开始的时间，如2012-04-05 00:00:00
function dateMonthDateBeginString2() {
	var day = dateGetLastMonth();
	var date =dateGetNextMulDay(day,1);
	var str = dateFormatValue(date.getFullYear()) + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//返回一个月前的今天的0点开始的时间，如2012-04-05 00:00:00
function dateYarMonthDateBeginString2() {
	var day = dateGetLastMonth();
	var date =dateGetNextMulDay(day,0);
	var str = dateFormatValue(date.getFullYear()) + "-" + dateFormatValue(date.getMonth() + 1) + "-" + dateFormatValue(date.getDate()) 
		+ " 00:00:00";
	return str;	
}

//取得明年的今天
function dateGetNextYear(){
	var today = new Date();
	var y,m,d;
	d = today.getDate();
	m = today.getMonth();
	y = today.getFullYear();
	y ++;//年加1
	if(m==1 && d==29) {	//月是从0开始
		return new Date(y,3,1);//如果是闰年，返回3月1日
	} else {
		return new Date(y,m,d);
	}
}

//取得下个月的今天
function dateGetNextMonth(){
	var today = new Date();
	var y,m,d;
	d = today.getDate();
	m = today.getMonth() + 1;//月是从0开始
	y = today.getFullYear();
	  
	m++;
	if( m > 12){//月份加1，如果大于12，则月份为1份，年份加1
		m=1;	y++;
	}
	 
	if( !dateCheckDateString(y + '-' + m + '-' + d) ){//如果不是日期，那么月份加1，日等于1
		m++;
		if( m > 12){//月份加1，如果大于12，则月份为1份，年份加1
			m=1;y++;
		}
		d=1;
	}
	var nextToday = new Date(y, m, d);
	return nextToday;
}

//取往后多少个月的时间
function dateGetNextMulMonth(day, count) {
	var today = day;
	var y,m,d;
	d = today.getDate();
	m = today.getMonth() + 1;//月是从0开始
	y = today.getFullYear();
	  
	m += count;
	if( m > 12){//月份加1，如果大于12，则月份为1份，年份加1
		y += parseInt(m/12);
		m = m%12;	
		if (m == 0) {
			m = 12;
		}
	}
	if( !dateCheckDateString(y + '-' + m + '-' + d) ){//如果不是日期，那么月份加1，日等于1
		m++;
		if( m > 12){//月份加1，如果大于12，则月份为1份，年份加1
			y += parseInt(m/12);
			m = m%12;	
			if (m == 0) {
				m = 12;
			}
		}
		d=1;
	}
	var nextToday = new Date(y, m - 1, d);
	return new Date(Date.parse(nextToday) - 86400000);
}

//取往后多天的时间
function dateGetNextMulDay(day, count) {
	return new Date(Date.parse(day) + count * 86400000);
}

//判断是否正确的日期,格式：年-月-日
function dateCheckDateString(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if (r==null) {
		return false;
	} 
	
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
   
//判断是否正确的日期,格式：年-月
function monthCheckDateString(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if (r==null) {
		return false;
	} 
	
	var d= new Date(r[1], r[3]-1); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]);
}

//取得上个月的今天
function dateGetLastMonth(){
	var today = new Date();
	var y,m,d;
	d = today.getDate();
	m = today.getMonth() + 1;//月是从0开始
	y = today.getFullYear();
	  
	m--;
	if( m < 1){//月份加1，如果大于12，则月份为1份，年份加1
		m=12;	y--;
	}
	if( !dateCheckDateString(y + '-' + m + '-' + d) ){//如果不是日期，则改变天数
		var maxDay = getCountDays(dateStrDate2MonthDate(y + '-' + m));//取一个月最大天数
		if(d > maxDay) {
			d = maxDay;
		}else {
			d=1;
		}
	}
	var nextToday = new Date(y, m - 1, d);
	return nextToday;
}

//取上个月
function monthGetLastMonth(){
	var today = new Date();
	var y,m;
	m = today.getMonth() + 1;//月是从0开始
	y = today.getFullYear();
	m--;
	if( m < 1){//月份加1，如果大于12，则月份为1份，年份加1
		m=12;	y--;
	}
	 
	if( !monthCheckDateString(y + '-' + m) ){//如果不是日期，则改变天数
		d=1;
	}
	var nextToday = new Date(y, m - 1);
	return nextToday;
}

//判断  10:00:23	格式是否正确
function dateIsValidTime(str)
{
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) { 
		return false;
	}
	
	if (a[1]>24 || a[3]>60 || a[4]>60)
	{
		return false;
	}
	
	return true;
}

//判断  2012-04	格式是否正确
function dateIsValidMonthDate(str)	{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})$/);
	if(r==null) {
		return false;  
	}
	
	var d= new Date(r[1], r[3]-1);  
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]);
}

//判断  2012-04-05	格式是否正确
function dateIsValidDate(str)	{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
	if(r==null) {
		return false;  
	}
	
	var d= new Date(r[1], r[3]-1, r[4]);  
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}

//判断  2012-04-05 10:00:00	格式是否正确
function dateIsValidDateTime(str)	{
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;  
	var r = str.match(reg);  
	if(r==null)	{
		return false;
	}
	  
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);  
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

//字符(长时间2012-04-05 10:00:00）转换成时间
function dateStrLongTime2Date(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;  
	var r = str.match(reg);  
	if(r==null)	{
		return "";
	}
	  
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
	return d;
}

//字符(长时间2012-04-05）转换成时间
function dateStrDate2Date(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;  
	var r = str.match(reg);  
	if(r==null)	{
		return "";
	}
	  
	var d= new Date(r[1], r[3]-1,r[4]);
	return d;
}

//字符(长时间2012-04）转换成时间
function dateStrDate2MonthDate(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})$/;  
	var r = str.match(reg);
	if(r==null)	{
		return false;
	}
	  
	var d= new Date(r[1], r[3]-1);
	return d;
}

//判断字符时间大小
function dateCompareStrLongTime(str1, str2) {
	var d1 = dateStrLongTime2Date(str1);
	var d2 = dateStrLongTime2Date(str2);
	if( d1.getTime() > d2.getTime() ) {
		return 1;
	} else if (d1.getTime() == d2.getTime()) {
		return 0;
	} else {
		return -1;
	}
}

//判断字符时间大小  日期
function dateCompareStrDate(str1, str2) {
	var d1 = dateStrDate2Date(str1);
	var d2 = dateStrDate2Date(str2);
	if( d1.getTime() > d2.getTime() ) {
		return 1;
	} else if (d1.getTime() == d2.getTime()) {
		return 0;
	} else {
		return -1;
	}
}

//判断字符时间大小  日期
function dateCompareStrLongDate(str1, str2) {
	var d1 = dateStrLongTime2Date(str1);
	var d2 = dateStrLongTime2Date(str2);
	if( d1.getTime() > d2.getTime() ) {
		return 1;
	} else if (d1.getTime() == d2.getTime()) {
		return 0;
	} else {
		return -1;
	}
}

//判断字符时间 是否大于当前时间
function isTimeValid(dateTime) {
	var date = new Date();
	var nowTime = date.getTime();
	var time = dateTime.getTime();
	if(nowTime >= time ) {//
		return true;
	}  else {
		return false;
	}
}
//判断字符时间大小  年月
function dateCompareStrMonthDate(str1, str2) {
	var d1 = dateStrDate2MonthDate(str1);
	var d2 = dateStrDate2MonthDate(str2);
	if( d1.getTime() > d2.getTime() ) {
		return 1;
	} else if (d1.getTime() == d2.getTime()) {
		return 0;
	} else {
		return -1;
	}
}

//判断字符时间范围，
function dateCompareStrLongTimeRange(strB, strE, day) {
	var dB = dateStrLongTime2Date(strB);
	var dE = dateStrLongTime2Date(strE);
	var span = dE.getTime() - dB.getTime();
	if ( span > (day*1000*60*60*24) ) {
		return false;
	} else {
		return true;
	}
}

//判断字符时间范围，YYYY-MM-dd
function dateCompareStrDateRange(strB, strE, day) {
	var dB = dateStrDate2Date(strB);
	var dE = dateStrDate2Date(strE);
	var span = dE.getTime() - dB.getTime();
	if ( span > (day*1000*60*60*24) ) {
		return false;
	} else {
		return true;
	}
}

//判断字符时间范围，YYYY-MM
function dateCompareStrMonthRange(strB, strE, month) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})$/;  
	var rb = strB.match(reg);
	var re = strE.match(reg);
	var yearbg = parseIntDecimal(rb[1]);
	var yeared = parseIntDecimal(re[1]);
	var monthbg = parseIntDecimal(rb[3]);
	var monthed = parseIntDecimal(re[3]);
	if(yeared - yearbg > 0) {
		return month >= (yeared - yearbg) * 12 + monthed - monthbg + 1;
	}else {
		return month >= monthed - monthbg + 1;
	}
}

//将整形转换成短时间
function dateTime2DateString(time) {
	return dateFormat2DateString(new Date(time));
}

//将整形转换成长时间
function dateTime2TimeString(time) {
	return dateFormat2TimeString(new Date(time));
}

//将整形转换成短时间
function dateTime2MonthDateString(time) {
    return dateFormat2MonthDateString(new Date(time));
}

//IE下适配new Date()  将长时间字符串日期转换为时间
function NewDate(str){
    if(!str){
        return 0;
    }
    arr=str.split(" ");
    d=arr[0].split("-");
    t=arr[1].split(":");
    var date = new Date();
    date.setFullYear(d[0], d[1] - 1, d[2]);
    date.setHours(t[0], t[1], t[2], 0);
    return date;
}


//判断时间是否超时
function dateIsTimeout(last, interval) {
	var date = new Date();
	var nowTime = date.getTime();
	var lastTime = last.getTime();
	var timeout = false;
	
	if (lastTime <= nowTime){
		if ((nowTime - lastTime) >= interval){
			timeout = true;
		}
	} else {
		timeout = true;
	}
	return timeout;
}

//转换秒 如  0 = 0:0
function second2ShortHour(second) {
	var hour = parseIntDecimal(second / 3600);
	var hourStr = hour;
	if (hour < 10) {
		hourStr = "0" + hour;
	}
	var minute = parseIntDecimal((second % 3600) / 60);
	var minStr = minute;
	if (minute < 10) {
		minStr = "0" + minute;
	}
	return hourStr + ":" + minStr;
}

//转换秒 如  0 = 0:0
function second2ShortHourEx(second) {
	var hour = parseIntDecimal(second / 3600);
	var hourStr = hour;
	if (hour < 10) {
		hourStr = "0" + hour;
	}
	var minute = parseIntDecimal((second % 3600) / 60);
	var minStr = minute;
	if (minute < 10) {
		minStr = "0" + minute;
	}
	var second = parseIntDecimal(second %  60);
	var secStr = second;
	if (second < 10) {
		secStr = "0" + second;
	}
	return hourStr + ":" + minStr + ":" + secStr;
}

function parseIntDecimal(str) {
	return parseInt(str, 10);
}

//0:0 转换成 0
function shortHour2Second(hour) {
	var temp = hour.split(":");
	if (temp.length == 2) {
		return parseIntDecimal(temp[0]) * 3600 + parseIntDecimal(temp[1]) * 60;
	} else if (temp.length == 3) {
		return parseIntDecimal(temp[0]) * 3600 + parseIntDecimal(temp[1]) * 60 + parseIntDecimal(temp[2]);
	} else {
		return 0;
	}
}

//取得一个月最大的天数
function getCountDays(day) {
    var curDate = day;
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
   /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
   curDate.setMonth(curMonth + 1);
   /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
   curDate.setDate(0);
   /* 返回当月的天数 */
   return curDate.getDate();
}

//取得下个月的一号
function dateGetNextMonthEx(){
	var today = new Date();
	var y,m,d;
	d = today.getDate();
	m = today.getMonth() + 1;//月是从0开始
	y = today.getFullYear();
	  
	m++;
	if( m > 12){//月份加1，如果大于12，则月份为1份，年份加1
		m=1;	y++;
	}
	d = 1;
	var nextToday = new Date(y, m - 1, d);
	return nextToday;
}

//获得某月的最后一天 
function getLastDay(year,month) {        
     var new_year = year;    //取当前的年份         
     var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）         
     if(month>12) {        
      new_month -=12;        //月份减         
      new_year++;            //年份增         
     }        
     var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天         
     return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期         
}

//获取两个日期的间隔天数
function getDateInterval(date1,date2){
    var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
    //根据年 . 月 . 日的值创建Date对象
    var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
    var date2Str = date2.split("-");
    var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
    var t1 = date1Obj.getTime();
    var t2 = date2Obj.getTime();
    var dateTime = 1000*60*60*24; //每一天的毫秒数
    var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
    var days = Math.abs(minusDays);//取绝对值
    return days;
}