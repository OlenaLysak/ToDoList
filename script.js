$(document).ready(function () {

    $("#toDoInput").keypress(function (event) {
        if (event.which === 13) {
            addListItem();
            $('#toDoInput').val('')
        }

    });

    $(".navigation-bar").css('display', 'none');

    $('#all-items').addClass('active');

    $('#all-items').click(function () {
        $(this).addClass('active');
        $('#active-items').removeClass('active');
        $('#completed-items').removeClass('active');

        $('.checkbox:checked').each(function () {
            $(this).parent().css('display', 'flex')
        });

        $('.checkbox:not(:checked)').each(function () {
            $(this).parent().css('display', 'flex')
        });
    });

    $('#active-items').click(function () {
        $(this).addClass('active');
        $('#all-items').removeClass('active');
        $('#completed-items').removeClass('active');

        $('.checkbox:checked').each(function () {
            $(this).parent().css('display', 'none')
        });

        $('.checkbox:not(:checked)').each(function () {
            $(this).parent().css('display', 'flex')
        });

    });

    $('#completed-items').click(function () {
        $(this).addClass('active');
        $('#active-items').removeClass('active');
        $('#all-items').removeClass('active');

        $('.checkbox:checked').each(function () {
            $(this).parent().css('display', 'flex')
        });

        $('.checkbox:not(:checked)').each(function () {
            $(this).parent().css('display', 'none')
        });
    });

    addTestItems();

});

function addListItem(content) {
    var itemNode = $("<div>").addClass('item');
    var itemText = content || $('#toDoInput').val();
    var itemValue = $('<div>')
        .text(itemText)
        .addClass('task');
    var checkbox = $('<input />', {type: 'checkbox'}).addClass('checkbox');
    var deleteButton = $('<div>')
        .text('X')
        .addClass('x-button')
        .click(() => {
            itemNode.remove();
            if (!$(".item").length) {
                $(".navigation-bar").css('display', 'none')
            }
        });
    itemNode
        .append(checkbox, itemValue, deleteButton)
        .mouseover(() => {
            deleteButton.css('display', 'flex')
        })
        .mouseleave(() => {
            deleteButton.css('display', 'none')
        });

    $(".navigation-bar").css('display', 'flex');

    checkbox.change(function (currVal) {
        var currVal = $(this).is(':checked');
        if (currVal) {
            itemNode.detach();
            itemValue.css('text-decoration', 'line-through');
            $('#list').append(itemNode)
        } else {
            itemNode.detach();
            itemValue.css('text-decoration', 'none');
            $('#list').prepend(itemNode)
        }
    });

    $('#list').append(itemNode);
    return itemNode
}


function addTestItems() {
    addListItem(5);
    addListItem('');
    addListItem('a').find("input").prop('checked', true).change();
}