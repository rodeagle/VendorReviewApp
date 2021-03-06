
export default {
    template : `
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {{{body}}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
    </div>
    `,
    Show : function(properties){
        let source = this.template;
        let template = Handlebars.compile(source);
        let html = template(properties);
        $('body').append(html);
        $('.modal').modal({backdrop: 'static', keyboard: false});

        $('[data-dismiss="modal"]').click(function(){
            // debugger;
            let res = $(this).parents('.modal');
            res.modal('hide');
            setTimeout(function(){
                res.empty();
                res.remove();
                $('.modal-backdrop').remove();
                $('.modal-backdrop').empty();
            },250);
        });
    }
}