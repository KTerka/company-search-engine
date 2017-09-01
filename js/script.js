$(function(){

	var companyDetails = $('#name_company');
	var companyStreet = $('#street');
	var companyNr = $('#nr');
	var companyCode = $('#post_code');
	var companyCity = $('#city');
	
	$('#search').click(searchCompany);
	
	$( "form" ).hide();

	function searchCompany() {
		clearForm();
		var companyID = $('#company_nr').val();
		companyID = checkNumber(companyID);
		if (companyID === ""){
			alert("Numer jest nieprawidłowy.");
			return;
		}
		var companyData = getDataFromServer(companyID);
		console.log(companyData);
		
	}

	function clearForm(){
		$("#name_company:text").val(" ");
		$("#street").val(" ");
		$("#nr").val(" ");
		$("#post_code").val(" ");
		$("#city").val(" ");
	}
	
	

	function showCompanyDetails(CompanyInfo) {
		if (CompanyInfo == undefined) {
			alert("Nie ma w bazie danych!");
		}
		else {
			$( "form" ).show();
			nameCompany = CompanyInfo.Name;
			companyDetails.val( nameCompany );
			
			streetCompany = CompanyInfo.Street;
			companyStreet.val( streetCompany );
			
			nrCompany = CompanyInfo.HouseNumber + " / " + CompanyInfo.ApartmentNumber;
			companyNr.val(nrCompany);
			
			codeCompany = CompanyInfo.PostalCode;
			companyCode.val(codeCompany);
			
			cityCompany = CompanyInfo.Place;
			companyCity.val(cityCompany);
		}
		
	}	
	
	function checkNumber(companyIDstring){
		
		
			//var nip = $('#company_nr').val();
			function IsNipValid(nip) {
				var weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
				nip = nip.replace(/[\s-]/g, '');
				nip = nip.replace(/PL/gi, '');
                   
				if (nip.length == 10 && parseInt(nip, 10) > 0) {
					var sum = 0;
					for(var i = 0; i < 9; i++){
                        sum += nip[i] * weights[i];
					}                     
					if ((sum % 11) == nip[9]) {
						return nip;
					};
				}
				return "";		
			};
			
			function IsRegonValid(regon){
				if (regon.length == 9 && parseInt(regon, 10) > 0){
					var weights8 = [8, 9, 2, 3, 4, 5, 6, 7];
					var sum = 0;
					for (var i=0; i < 8; i++){
						sum += regon[i]*weights8[i];
					}
					if ((sum % 11) == regon[8]){
						return regon;
					};
					
				}
				else if (regon.length == 14 && parseInt(regon, 10) > 0){
					var weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
					var sum2 = 0;
					for (var i = 0; i < 13; i++){
						sum2 += regon[i]*weights14[i];
					}
					if ((sum2 % 11) == regon[13]){
						return regon;
					};
				}
				return "";
			};
			
			function IsKrsValid(krs){
				if (krs.length == 13 && krs.substring(0, 3) == "KRS" && parseInt(krs.substring(3, 13)) >0 ){
					return krs;
				}
				return "";
			}
			
		result = IsNipValid(companyIDstring);
		if (result !== "") {
			return result;
		}
		
		result = IsRegonValid(companyIDstring);
		if (result !== "") {
			return result;
		}
		
		result = IsKrsValid(companyIDstring);
		if (result !== "") {
			return result;
		}
		return "";	
	}
	
	function getDataFromServer(companyID){
		console.log("getDataFromServer");
		var url = 'http://ihaveanidea.aveneo.pl/NIPAPI/api/Company?CompanyId=';
		var result = null;
		$.ajax({
			url: url + companyID,
			contentType: 'json',
			method: 'GET',
			success: function(resp){
				if (resp.Success === true) {
					showCompanyDetails(resp.CompanyInformation); 
				}
			},
			error: function () {
				console.log("error");
			}
		});
		return result;

	}
	
});