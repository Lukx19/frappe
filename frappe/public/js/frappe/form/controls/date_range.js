// frappe.ui.form.ControlDateRange = frappe.ui.form.ControlData.extend({
// 	make_input: function () {
// 		var me = this;
// 		this._super();
// 		this.set_flatpickr();
// 		// this.refresh();
// 	},
// 	set_flatpickr: function () {
// 		var me = this;
// 		var flatpickr_options = {
// 			mode: "range",
// 			allowInput: true,
// 			altInput: true,
// 		}
// 		flatpickr_options.altFormat = this.get_format()
// 		flatpickr_options.onChange = function (selectedDates, dateStr, instance) {
// 			frappe.msgprint("changer" + dateStr);
// 			if (selectedDates.length == 2) {
// 				me.set_input(moment(selectedDates[0]).format('YYYY-MM-DD'), moment(selectedDates[1]).format('YYYY-MM-DD'));
// 			}
// 			// else {
// 			// 	me.set_input(dateStr)
// 			// }
// 		};
// 		this.flatpickr = this.$input.flatpickr(flatpickr_options);
// 	},

// 	get_format: function () {
// 		return (frappe.boot.sysdefaults.date_format || 'yyyy/mm/dd')
// 			.replace("yyyy", "Y")
// 			.replace("yy", "y")
// 			.replace("mm", "m")
// 			.replace("mmm", "M")
// 			.replace("dd", "d");
// 	},
// 	set_input: function (value, value2) {
// 		frappe.msgprint("sinput2 " + value + "  " + value2);
// 		// this.last_value = this.value;
// 		if (value && value2) {
// 			this.$input && this.$input.val(this.format_for_input(value, value2));
// 			// this.value = [value, value2];
// 		} else {
// 			// this.value = value
// 		}
// 		// if (this.value) {
// 		// 	this.$input && this.$input.val(this.format_for_input(this.value[0], this.value[1]));
// 		// } else {
// 		// 	this.$input && this.$input.val("")
// 		// }
// 		this.set_disp_area();
// 		this.set_mandatory && this.set_mandatory(value);
// 	},
// 	// parse: function (value) {
// 	// 	frappe.msgprint("rparse");
// 	// 	if (value) {
// 	// 		vals = value.split(" ")
// 	// 		value = frappe.datetime.user_to_obj(vals[0]);
// 	// 		value2 = frappe.datetime.user_to_obj(vals[vals.length - 1]);
// 	// 		return [value, value2];
// 	// 	}
// 	// },
// 	format_for_input: function (value1, value2) {
// 		frappe.msgprint("rformat");
// 		if (value1 && value2) {

// 			value1 = frappe.datetime.str_to_user(value1);
// 			value2 = frappe.datetime.str_to_user(value2);
// 			return __("{0} xx {1}", [value1, value2]);
// 		}
// 		return "";
// 	},
// 	validate: function (value) {
// 		return value;
// 	}
// });

frappe.ui.form.ControlDateRange = frappe.ui.form.ControlData.extend({
	make_input: function () {
		this._super();
		this.set_date_options();
		this.set_datepicker();
		this.refresh();
	},
	set_date_options: function () {
		var me = this;
		this.datepicker_options = {
			language: "en",
			range: true,
			autoClose: true,
			toggleSelected: false
		};
		this.datepicker_options.dateFormat =
			(frappe.boot.sysdefaults.date_format || 'yyyy-mm-dd');
		this.datepicker_options.onSelect = function () {
			me.$input.trigger('change');
		};
	},
	set_datepicker: function () {
		this.$input.datepicker(this.datepicker_options);
		this.datepicker = this.$input.data('datepicker');
	},
	set_input: function (value, value2) {
		this.last_value = this.value;
		if (value && value2) {
			this.value = [value, value2];
		} else {
			this.value = value;
		}
		if (this.value) {
			let formatted = this.format_for_input(this.value[0], this.value[1]);
			this.$input && this.$input.val(formatted);
		} else {
			this.$input && this.$input.val("");
		}
		this.set_disp_area(value || '');
		this.set_mandatory && this.set_mandatory(value);
	},
	parse: function (value) {
		// replace the separator (which can be in user language) with comma
		const to = __('{0} to {1}').replace('{0}', '').replace('{1}', '');
		value = value.replace(to, ',');

		if (value && value.includes(',')) {
			var vals = value.split(',');
			var from_date = moment(frappe.datetime.user_to_obj(vals[0])).format('YYYY-MM-DD');
			var to_date = moment(frappe.datetime.user_to_obj(vals[vals.length - 1])).format('YYYY-MM-DD');
			return [from_date, to_date];
		}
	},
	format_for_input: function (value1, value2) {
		if (value1 && value2) {
			value1 = frappe.datetime.str_to_user(value1);
			value2 = frappe.datetime.str_to_user(value2);
			return __("{0} xx {1}", [value1, value2]);
		}
		return "";
	}
});