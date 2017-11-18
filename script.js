$(document).ready(function () {

    $("#toDoInput").keypress(keyPresHandler);

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

    $('#check-all').click(toggleAll);
    //addTestItems();
    //checkItem($('.item').get(0));
    //uncheckItem($('.item').get(1))
});

function keyPresHandler(event) {
    if (event.which === 13) {
        addListItem();
        $('#toDoInput').val('')
    }
}

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

    checkbox.change(()=> toggleItem(itemNode));

    $('#list').append(itemNode);
    return itemNode
}


function addTestItems() {
    addListItem(5);
    addListItem('');
    addListItem('a').find("input").prop('checked', true).change();
}

function toggleAll() {
    var items = $('.item');
    var uncheckedItems = $('.checkbox:not(:checked)');
    if (uncheckedItems.length) {
        items.each(index => checkItem(items[index]))
    } else {
        items.each(index => uncheckItem(items[index]))
    }
}

function checkItem(itemNode) {
    $(itemNode).find('input').prop('checked', true);
    $(itemNode).find(".task").css('text-decoration', 'line-through');
    $(itemNode).detach();
    $('#list').append(itemNode);
}

function uncheckItem(itemNode) {
    $(itemNode).find('input').prop('checked', false);
    $(itemNode).find(".task").css('text-decoration', 'none');
    $(itemNode).detach();
    $('#list').prepend(itemNode);
}

function toggleItem(itemNode) {
    var currVal = $(itemNode).find("input").is(':checked');
    if (currVal) {
        checkItem(itemNode)
    } else {
        uncheckItem(itemNode)
    }
}

