// Create Namespaces
var jb = jb || {};
jb.web = jb.web || {};
jb.web.FormBuilder = jb.web.FormBuilder || {};

// Cache the templates used for form items
// These are stored in HTML
var textBoxTemplate = $('#textBoxTemplate').html(),
    textBoxPropertiesTemplate = $('#textBoxPropertiesTemplate').html(),
    textAreaTemplate = $('#textAreaTemplate').html(),
    textAreaPropertiesTemplate = $('#textAreaPropertiesTemplate').html(),
    radioButtonTemplate = $('#radioButtonTemplate').html(),
    radioButtonPropertiesTemplate = $('#radioButtonPropertiesTemplate').html(),
    checkboxTemplate = $('#checkboxTemplate').html(),
    checkboxPropertiesTemplate = $('#checkboxPropertiesTemplate').html(),
    dropdownTemplate = $('#dropdownTemplate').html(),
    dropdownPropertiesTemplate = $('#dropdownPropertiesTemplate').html(),
    htmlTemplate = $('#htmlTemplate').html(),
    htmlPropertiesTemplate = $('#htmlPropertiesTemplate').html(),
    buttonTemplate = $('#buttonTemplate').html(),
    buttonPropertiesTemplate = $('#buttonPropertiesTemplate').html(),
    fieldChoicesTemplate = $('#fieldChoicesTemplate').html();


// Add droppable areas after each form field and one at the top of the form builder
jb.web.FormBuilder.createDroppableAreas = function (formName) {
    var $form = $('#' + formName + ' .dds-web-cp-FormBuilder dl'),
        dropArea = '<p class="droppable-area"></p>';

    // first, remove any droppable areas that are already in the form
    $form.find('.droppable-area').remove();
    // then add a droppable area after each form item
    $form.find('dd').each(function () {
        $(this).after(dropArea);
    });
    // and add one droppable area to the top of the form
    $form.prepend(dropArea);
};

// Load form fields, if they exist, and add droppable areas
jb.web.FormBuilder.loadFormItems = function (formName) {
    // Load form fields, not implemented in mockup

    jb.web.FormBuilder.createDroppableAreas(formName);
};

// When a new form item is dropped on the form builder
// attach the correct form field and add droppable areas
jb.web.FormBuilder.formItemDropped = function (event, ui, formName) {
    var itemType = ui.draggable.data('form-type'),
        $target = $('#' + formName + ' .dds-web-cp-FormBuilder dl').find(event.target),
        guid = jb.web.NewGuid(),
        formItem;

    // Replace targeted droppable area with template HTML, 
    // add id and data-form-type
    switch (itemType.toLowerCase()) {
        case 'html':
            $target.replaceWith($(htmlTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            break;
        case 'textbox':
            $target.replaceWith($(textBoxTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        case 'textarea':
            $target.replaceWith($(textAreaTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        case 'radio':
            $target.replaceWith($(radioButtonTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        case 'checkbox':
            $target.replaceWith($(checkboxTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        case 'dropdown':
            $target.replaceWith($(dropdownTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        case 'button':
            $target.replaceWith($(buttonTemplate).attr('id', 'formitem_' + guid).data('form-type', itemType));
            jb.web.FormBuilder.setUpFormItem(formName, guid);
            break;
        default:
            break;
    }
    jb.web.FormBuilder.createDroppableAreas(formName);
    jb.web.FormBuilder.enableDragForItem(formName);
};

// Find the new HTML, apply id to input and for attribute to label
jb.web.FormBuilder.setUpFormItem = function (formName, guid) {
    var formitem = $('#' + formName + ' .dds-web-cp-FormBuilder dl').find('#formitem_' + guid);
    
    // if radio or checkbox, loop through each li
    if ($(formitem).children('ul').length) {
        $(formitem).find('li').each(function (index, el) {
            var label = $(this).find('label').text();
            $(this).find('input').attr({
                'id': 'input_' + guid + '_option' + index,
                'name': 'dds_' + label
            });
            $(this).find('label').attr('for', 'input_' + guid + '_option' + index);
        });
    } else {
        var label = $(formitem).find('label').text();
        $(formitem).find('label').attr('for', 'input_' + guid);
        $(formitem).find('input, textarea, select, button').attr({
            'id': 'input_' + guid,
            'name': 'dds_' + label
        });
    }
}


// When an existing form item is moved and dropped on the form builder
// attach the correct form field and add droppable areas
jb.web.FormBuilder.formItemMoved = function (event, ui, formName) {
    var html = $('.ui-moving');
    $(event.target).replaceWith(html);

    // Remove and reset droppable areas
    jb.web.FormBuilder.createDroppableAreas(formName);
    jb.web.FormBuilder.enableDragForItem(formName);
};


// Set up draggable for new form fields in the left hand menu
jb.web.FormBuilder.enableDragAndDrop = function (formName) {
    $('.jsNewFormField').draggable({
        helper: 'clone',
        cursorAt: { top: -5, left: -5 },
        revert: 'invalid',
        start: function (event, ui) {
            $('#beginForm').remove();
            jb.web.FormBuilder.resetDroppableAreas(formName);
        }
    });
    $('.jsNewFormField').disableSelection();
};

// Set up draggable for form fields in the form builder
jb.web.FormBuilder.enableDragForItem = function (formName) {
    $('.form-item').draggable({
        helper: function () {
            var helperElement = $("<div></div>"),
                itemType = $(this).data('form-type');

            helperElement.append("Moving " + itemType);
            helperElement.addClass("formField ui-move-helper");

            return helperElement;
        },
        cursorAt: { top: -5, left: -5 },
        revert: 'invalid',
        start: function (event, ui) {
            $(this).addClass('ui-moving');
            jb.web.FormBuilder.resetDroppableAreas(formName);
        },
        stop: function () {
            $('.ui-move-helper').remove();
            $(this).removeClass('ui-moving');
        }
    });
};

jb.web.FormBuilder.resetDroppableAreas = function (formName) {
    var classToApplyDragDropTo = '#' + formName + ' .droppable-area';

    $('#' + formName + ' .droppable-area.ui-droppable').droppable('destroy');
    $(classToApplyDragDropTo).removeClass('ui-state-active');

    $(classToApplyDragDropTo).droppable({
        greed: 'true',
        accept: '.jsNewFormField, .form-item',
        activeClass: 'ui-state-active',
        hoverClass: 'ui-state-hover',
        tolerance: 'pointer',
        drop: function (event, ui) {
            // If dropping a new item
            if (ui.draggable.hasClass('jsNewFormField')) {
                jb.web.FormBuilder.formItemDropped(event, ui, formName);
            }
            // If moving an item
            else {
                jb.web.FormBuilder.formItemMoved(event, ui, formName);
            }
        }
    });
};

// Show form field properties when form field is clicked
$('.dds-web-cp-FormBuilder').on('click', '.form-item', function () {
    var formName = $(this).closest('form').attr('id'),
        type = $(this).data('form-type'),
        label = $(this).find('.desc').text(),
        $propertiesPanel = $('.jsFormFieldProperties dl');

    jb.web.FormBuilder.closeFormProperties(formName);
    
    $(this).addClass('editing');
    $('#noFieldSelected').hide();
    $propertiesPanel.empty();
    $('a[href="#fieldSettings"]').trigger('click');
    switch (type) {
        case 'html':
            $propertiesPanel.html(htmlPropertiesTemplate);
            break;
        case 'textbox':
            var originalInputValue = $(this).find('input').val();
            $propertiesPanel.html(textBoxPropertiesTemplate)
                            .find('.propertiesLabel').val(label);
            break;
        case 'textarea':
            $propertiesPanel.html(textAreaPropertiesTemplate)
                            .find('.propertiesLabel').val(label);
            break;
        case 'radio':
            var choices = [
                { type: 'radio', checked: false, text: 'First Choice' },
                { type: 'radio', checked: false, text: 'Second Choice' },
                { type: 'radio', checked: false, text: 'Third Choice' }
            ];

            $propertiesPanel.html(radioButtonPropertiesTemplate)
                            .find('.propertiesLabel').val(label);

            $propertiesPanel.find('.fieldChoices').empty();

            $.each(choices, function (index, val) {
                // if ul.fieldchoices is empty, append the li
                // else add the li after the last-child
                if ($propertiesPanel.find('.fieldChoices li').length === 0) {
                    jb.web.FormBuilder.newFieldChoice($propertiesPanel, choices[index].type, choices[index].checked, choices[index].text);
                } else {
                    jb.web.FormBuilder.addFieldChoice($propertiesPanel.find('.fieldChoices li:last-child'), choices[index].type, choices[index].checked, choices[index].text);
                }
            });
            break;
        case 'checkbox':
            var choices = [
                { type: 'checkbox', checked: false, text: 'First Choice' },
                { type: 'checkbox', checked: false, text: 'Second Choice' },
                { type: 'checkbox', checked: false, text: 'Third Choice' }
            ];

            $propertiesPanel.html(checkboxPropertiesTemplate)
                            .find('.propertiesLabel').val(label);

            $propertiesPanel.find('.fieldChoices').empty();

            $.each(choices, function (index, val) {
                // if ul.fieldchoices is empty, append the li
                // else add the li after the last-child
                if ($propertiesPanel.find('.fieldChoices li').length === 0) {
                    jb.web.FormBuilder.newFieldChoice($propertiesPanel, choices[index].type, choices[index].checked, choices[index].text);
                } else {
                    jb.web.FormBuilder.addFieldChoice($propertiesPanel.find('.fieldChoices li:last-child'), choices[index].type, choices[index].checked, choices[index].text);
                }
            });
            break;
        case 'dropdown':
            var choices = [
                { type: 'radio', checked: true, text: '' },
                { type: 'radio', checked: false, text: 'First Choice' },
                { type: 'radio', checked: false, text: 'Second Choice' },
                { type: 'radio', checked: false, text: 'Third Choice' }
            ];

            $propertiesPanel.html(dropdownPropertiesTemplate)
                            .find('.propertiesLabel').val(label);

            $propertiesPanel.find('.fieldChoices').empty();

            $.each(choices, function (index, val) {
                // if ul.fieldchoices is empty, append the li
                // else add the li after the last-child
                if ($propertiesPanel.find('.fieldChoices li').length === 0) {
                    jb.web.FormBuilder.newFieldChoice($propertiesPanel, choices[index].type, choices[index].checked, choices[index].text);
                } else {
                    jb.web.FormBuilder.addFieldChoice($propertiesPanel.find('.fieldChoices li:last-child'), choices[index].type, choices[index].checked, choices[index].text);
                }
            });
            break;
        case 'button':
            $propertiesPanel.html(buttonPropertiesTemplate)
                            .find('.propertiesLabel').val(label);
            break;
        default:
            $('#noFieldSelected').show();
            break;
    }

    $('.propertiesLabel').focus().select();

    $('.propertiesLabel').on('keyup', function () {
        $('.editing .desc').text($(this).val());
    });

    // Checking the Required box adds an asterik to the label
    // and makes the field a required input
    // TODO: Clicking on label adds multiple stars
    $('.textBox-Required, .textArea-Required, .rb-Required, .cb-Required, .dd-Required').on('click', function(){
        if ($(this).prop('checked') === true) {
            $('.editing .desc').append('<span class="required">*</span>');
        } else {
            $('.editing .desc').find('.required').remove();
        }
    })

    //$(document).bind('mouseup', jb.web.FormBuilder.closeFormProperties);
});

jb.web.FormBuilder.closeFormProperties = function (e) {
    //var container = $('.form-item, .jsFormFieldProperties dl');

    //if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#noFieldSelected').show();
        $('.jsFormFieldProperties dl').empty();
        $('dd').removeClass('editing');
        //$(document).unbind('mouseup', jb.web.FormBuilder.closeFormProperties);
    //}
};

// delete a form item
$('.dds-web-cp-FormBuilder').on('click', '.dds-web-DeleteFormItem', function (e) {
    e.stopPropagation();
    var form = $(this).closest('form').attr('id'),
        formitem = $(this).closest('dd.form-item');
    $(formitem).remove();
    jb.web.FormBuilder.closeFormProperties();
    jb.web.FormBuilder.createDroppableAreas(form);
});

jb.web.FormBuilder.newFieldChoice = function ($propertiesPanel, type, checked, text) {
    var $lastitem, input;

    if (checked) {
        input = '<input type="' + type + '" checked="checked" name="fieldChoices" title="Make this choice pre-selected." />';
    } else {
        input = '<input type="' + type + '" name="fieldChoices" title="Make this choice pre-selected." />';
    }
    $propertiesPanel.find('.fieldChoices').append(fieldChoicesTemplate);

    $lastitem = $propertiesPanel.find('li:last-child');
    $lastitem.prepend(input);
    $lastitem.find('input.choicesText').val(text);
}
jb.web.FormBuilder.addFieldChoice = function ($choicesItem, type, checked, text) {
    var $listitem, input;

    if (checked) {
        input = '<input type="' + type + '" checked="checked" name="fieldChoices" title="Make this choice pre-selected." />';
    } else {
        input = '<input type="' + type + '" name="fieldChoices" title="Make this choice pre-selected." />';
    }
    $choicesItem.after(fieldChoicesTemplate);

    $listitem = $choicesItem.next();
    $listitem.prepend(input);
    $listitem.find('input.choicesText').val(text);
}

$('.dds-web-FormBuilderSide').on('click', '.dds-web-cp-AddFieldTab, .dds-web-cp-FormSettingsTab', function () {
    jb.web.FormBuilder.closeFormProperties();
});

$('.dds-web-FormBuilderSide').on('click', '.dds-web-cp-Form-AddChoice', function () {
    var $parent = $(this).closest('li'),
        type = $parent.find('input:first-child').attr('type');

    jb.web.FormBuilder.addFieldChoice($parent, type, false, '');
});

// Add Form Email Address
$('.formActionsContainer').on('click', '.jsShowFormEmailInput', function () {
    $(this).parent().find('.formEmailEntry').slideDown();
    $(this).slideUp();
});

jb.web.FormBuilder.loadFormItems(dialogId);
jb.web.FormBuilder.enableDragAndDrop(dialogId);
jb.web.FormBuilder.enableDragForItem(dialogId);
