function copyInvoice(invoiceid)
{
    var invoice;
    var serverUrl = Xrm.Page.context.getServerUrl();

    XrmSvcToolkit.retrieve({
        entityName: "Invoice",
        id: invoiceid,
        async: false,
        successCallback: function (result) {
            invoice = result;
        },
        errorCallback: function (error) {
           for(var propertyName in error) {
                  alert(error[propertyName]);}

        }
    });

 var invoiceGuid = invoiceid.replace("{","'").replace("}","'");
 var filterQuery = "?$filter=InvoiceId/Id eq  guid" + invoiceGuid;
XrmSvcToolkit.retrieveMultiple({ 
    entityName: "InvoiceDetail", 
    async: false, 
    odataQuery: filterQuery, 
    successCallback: function (result) { 
        products = result; 
    }, 
    errorCallback: function (error) { 
           for(var propertyName in error) {
                  alert(error[propertyName]);}

    } 
});



var today = new Date();

	XrmSvcToolkit.createRecord({
    entityName: "Invoice",
    entity: {Name: invoice.Name, CustomerId: invoice.CustomerId, PriceLevelId: invoice.PriceLevelId, TransactionCurrencyId: invoice.TransactionCurrencyId, BillTo_City: invoice.BillTo_City, BillTo_Country: invoice.BillTo_Country, BillTo_PostalCode: invoice.BillTo_PostalCode, BillTo_Line1: invoice.BillTo_Line1,  ShipTo_Country: invoice.ShipTo_Country, ShipTo_Line1: invoice.ShipTo_Line1, ShipTo_PostalCode: invoice.ShipTo_PostalCode, ShipTo_City: invoice.ShipTo_City, DateDelivered:  today },
    async: false,
    successCallback: function (result) {	
          for (i=0;i<products.length;i++) { copyInvoiceProduct(products[i],result); }	
        window.open(serverUrl + "/main.aspx?etn=invoice&pagetype=entityrecord&id=%7b" + result.InvoiceId + "%7d",'_blank');
    },
    errorCallback: function (error) {
		           for(var propertyName in error) {
                  alert(error[propertyName]);}
        //alert("There was an error with converting proposal to contract");
    }
	}); 

}

function copyInvoiceProduct(product, invoice)
{

XrmSvcToolkit.createRecord({
    entityName: "InvoiceDetail",
    entity: { InvoiceId: {__metadata: { type: "Microsoft.Crm.Sdk.Data.Services.EntityReference" }, Id: invoice.InvoiceId,LogicalName: "invoice" }, ProductDescription: product.ProductDescription, Quantity: product.Quantity, PricePerUnit: product.PricePerUnit, Tax: product.Tax, IsProductOveridden: product.IsProductOveridden, ManualDiscountAmount: product.ManualDiscountAmount  },
    async: false,
    successCallback: function (result) {	
    },
    errorCallback: function (error) {
		           for(var propertyName in error) {
                  alert(error[propertyName]);}
    }
	}); 

}