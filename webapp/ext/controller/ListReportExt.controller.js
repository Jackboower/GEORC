sap.ui.define(["sap/ui/core/Fragment",
    "sap/m/MessageToast"
],

    function (Fragment, MessageToast) {
        'use strict';
        return {
            UploadExcel: function () {
                //alert('Funciona !!!');
                this._getValueHelpRequest();
            },

            _getValueHelpRequest: function () {
                var oView = this.getView();

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "moovi.georc.fragment.uploadExcelfragment",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._pValueHelpDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                }.bind(this));
            },

            onSave: function () {

                var oFileUploader = this.byId("fileUploader");

                // Se você estiver em um Fragment, o "this.byId" pode retornar null 
                // se não houver um ID prefixado. Se o de cima falhar, tente:
                // var oFileUploader = sap.ui.getCore().byId("fileUploader");

                if (!oFileUploader) {
                    sap.m.MessageToast.show("Erro ao encontrar o componente de upload.");
                    return;
                }

                // Forma correta de pegar o arquivo via API do UI5
                var oFile = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

                if (oFile) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var vData = e.target.result;
                        console.log("Arquivo carregado com sucesso");
                        // Fechar o diálogo após o sucesso
                        this.byId("ListDialog").close();
                    }.bind(this); // .bind(this) é importante para o controller ser acessível dentro do reader

                } else {
                    sap.m.MessageToast.show("Por favor, selecione um arquivo primeiro.");
                }

                this.oDialog = this.getView().byId("ListDialog");
                this.oDialog.close();
            },


            onClose: function () {
                this.oDialog = this.getView().byId("ListDialog");
                this.oDialog.close();
            },


        }
    });