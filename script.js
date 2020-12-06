
import tables from "/easytables.js";
import data from "/data.js";
import modal from "/modal.js";

$(document).ready(Init());

function Init(){
    // "<a class='display-modal' data-guid='{{GetItemByName this 'guid'}}'>{{GetItemByName this 'name'}}<a/>"
    let newData = data.data.map(function(item){
        return {name: item.Name, days : item.AverageDay.toFixed(2), refund: (100 * item.AverageRefund.toFixed(2)), score : (item.AverageScore.toFixed(2) * 100), guid : item.Guid }
    });

    function CreateTable(newData){
        tables.CreateTable('#table-1', {
            headers: [
                { col: 3, name: "Nombre", template: `<a class="user-modal" data-guid="{{GetItemByName this 'guid'}}" href="javascript:void(0)">{{GetItemByName this 'name'}}</a>`, mobileClass : 'text-center' },
                { col: 3, name: "Promedio: de Rembolso (Dias)",  desktopClass: "text-center", mobileClass : 'text-center' },
                { col: 3, name: "Promedio: Si Rembolso",  desktopClass: "text-center", mobileClass : 'text-center' },
                { col: 3, name: "Score", desktopClass: "text-center", mobileClass : 'text-center' },
                { col: 0, name : "guid", hidden : true },
            ],
            rows: newData
        });
    }

    CreateTable(newData);

    $('#lastUpdateTime').html(`Ultima Actualizacion : <strong>${data.lastUpdate}</strong>`);

    $('#SearchBtn').click(function(){
        let searchVal = $('#SearchBox').val();
        let base = newData;
        base = base.filter(function (item) {
            return item.name.includes(searchVal);
        });
        CreateTable(base);
    });

    $('.user-modal').click(function(){
        let base = newData;
        let guid = $(this).data('guid');
        let name = $(this).text();
        let res = data.data.filter(function (item) {
            return item.Guid == guid;
        })[0];
        modal.Show({body : '<div class="py-2"><strong>Ultimos Comentarios : </strong><div><div class="modal-body-content"></div>', title : name });
        debugger;
        let reviews = res.Comments.map(function(item){
            return{
                type : (item.Type == "Mercado Libre") && `<span class="text-warning">ML</span>` || `<span class="text-danger">AMZ</span>`,
                comment : item.Comment,
                refunded : item.Refunded && `<span class="material-icons text-success">verified</span>` || `<span class="material-icons text-danger">highlight_off</span>`,
                time : new Date(item.TimeStamp).toLocaleDateString()
            };
        });

        tables.CreateTable('.modal-body-content', {
            headers: [
                { col: 1, name: "Tipo", isHTML : true, desktopClass: "text-center", mobileClass : 'text-center' },
                { col: 6, name: "Comentario" },
                { col: 2, name: "Rembolso", isHTML : true, desktopClass: "text-center", mobileClass : 'text-center' },
                { col: 3, name: "Fecha", desktopClass: "text-center", mobileClass : 'text-center' },
            ],
            rows: reviews
        });
    });
}
