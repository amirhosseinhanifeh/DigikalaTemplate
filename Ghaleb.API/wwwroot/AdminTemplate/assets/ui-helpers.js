$(document).ready(function () {
    $("#ProductCategoryId").change(function () {
        $("#SubProductCategoryId").find("option").remove();
        $("#SubProductCategoryId").append("<option value=''>انتخاب نمایید</option>");
        $.get("/Admin/ProductSubCategory/GetByAjax?productCategoryId=" + $(this).val(), function (res) {
            for (var i = 0; i < res.length; i++) {

                $("#SubProductCategoryId").append("<option value=" + res[i].id + ">" + res[i].value + "</option>");

            }
        });

    });
    $("#MainProuctCategoryId").change(function () {
        $("#BrandId").find("option").remove();
        $("#BrandId").append("<option value=''>انتخاب نمایید</option>");
        $.get("/Admin/Product/GetBrands?mainProductCategoryId=" + $(this).val(), function (res) {
            for (var i = 0; i < res.length; i++) {

                $("#BrandId").append("<option value=" + res[i].id + ">" + res[i].value + "</option>");

            }
        });

    });
    $("[type=file][file-type=image][multiple!=multiple]").change(function () {
        debugger;
        var input = $(this);
        var name = input.attr("data-id");
        var files = input.get(0).files;
        var formData = new FormData();

        for (var i = 0; i != files.length; i++) {
            formData.append("file", input.get(0).files[i]);
        }

        $.ajax(
            {
                url: "/Admin/Upload/UploadImage",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {
                    console.log(data);
                    //$("#ImageId").attr("src", data);
                    $("input[name=" + name + "]").val(data.data);
                    Swal.fire(
                        'تبریک !',
                        data.message,
                        'success'
                    )
                }
            }
        );
    });
    $("[type=file][file-type=image][multiple=multiple]").change(function () {
        debugger;
        var input = $(this);
        var name = input.attr("data-id");
        var files = input.get(0).files;
        var formData = new FormData();

        for (var i = 0; i != files.length; i++) {
            formData.append("files", input.get(0).files[i]);
            var file = input.get(0).files[i];
            if (file) {
                $("[data-id=" + name + "]").after("<img src=" + URL.createObjectURL(file) +" style='width:100px;height:100px' />");
            }
        }
        $.ajax(
            {
                url: "/Admin/Upload/UploadImages",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {
                    console.log(data);
                    debugger;
                    //$("#ImageId").attr("src", data);
                    for (var i = 0; i < data.length; i++) {
                        $("input[data-id=" + name + "]").after("<input hidden name=" + name + " value=" + data[i] +" />");
                    }
                 
                }
            }
        );
    });
    $("[type=file][file-type=file]").change(function (e) {
        debugger;
        var input = $(this);
        var name = input.attr("name");
        var files = input.get(0).files;
        var formData = new FormData();

        for (var i = 0; i != files.length; i++) {
            formData.append("file", input.get(0).files[i]);
        }

        $.ajax(
            {
                url: "/Admin/Upload/UploadFile",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {
                    //$("#ImageId").attr("src", data);
                    $("input[name=" + name + "]").val(data);
                }
            }
        );
    });
    $("[name=Url]").change(function () {
        $(this).val($(this).val().replace(" ", "-"));

    });
});
