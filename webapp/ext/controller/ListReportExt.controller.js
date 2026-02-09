sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
],

    function (Fragment,XLSX, MessageToast) {
        'use strict';
        return {
            UploadExcel: function () {
                //alert('Funciona !!!');
                this._getValueHelpRequest();
            },
            // Teste
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

                var oFileUploader = this.byId("fileUploader")

                var oFile = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
                var reader = new FileReader();

                // reader.onload = function (e) {
                var data = target.result;
                var workbook = XLSX.read(data, { type: 'binary' });



                // Pega a primeira planilha
                var sheetName = workbook.SheetNames[0];
                var jsonOutput = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                console.log(jsonOutput); // Aqui está o conteúdo do seu Excel
                // };

                reader.readAsArrayBuffer(oFile);
















                // var oFileUploader = this.byId("fileUploader");
                // var oView = this.getView();

                // // Se você estiver em um Fragment, o "this.byId" pode retornar null 
                // // se não houver um ID prefixado. Se o de cima falhar, tente:
                // // var oFileUploader = sap.ui.getCore().byId("fileUploader");

                // if (!oFileUploader) {
                //     sap.m.MessageToast.show("Erro ao encontrar o componente de upload.");
                //     return;
                // }

                // // Forma correta de pegar o arquivo via API do UI5
                // var oFile = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];




                // if (oFile) {

                //     //AREA DE TESTES PARA A LEITURA DO ARQUIVO EXCELL


                //     MessageToast.show("Dados Carregados com Sucesso !");

                //     //AREA DE TESTES PARA A LEITURA DO ARQUIVO EXCELL
                // } else {
                //     sap.m.MessageToast.show("Por favor, selecione um arquivo primeiro.");
                // }

                this.oDialog = this.getView().byId("ListDialog");
                this.oDialog.close();
            },

            onClose: function () {
                this.oDialog = this.getView().byId("ListDialog");
                this.oDialog.close();
            },


        }
    });