frappe.ui.form.ControlDatetime = frappe.ui.form.ControlDate.extend({
	set_flatpickr: function () {
		var me = this;
		this.flatpickr_options.enableTime = true;
		this.flatpickr_options.enableSeconds = true;
		this.flatpickr_options.time_24hr = true;
		// this.flatpickr_options.defaultDate = new Date();
		this.flatpickr_options.altFormat = this.get_format() + " H:i:S";
		this.flatpickr_options.onChange = function (selectedDates, dateStr, instance) {
			frappe.msgprint("change2");
			me.set_value(dateStr)
		};
		this.$input.flatpickr(this.flatpickr_options);
	},
	format_for_input: function (value) {
		frappe.msgprint("format2" + frappe.sys_defaults.date_format);
		if (value) {
			// convert and format
			value = frappe.datetime.str_to_user(frappe.datetime.convert_to_user_tz(value));
		}
		return value || "";
	}
});


// frappe.ui.form.ControlDatetime = frappe.ui.form.ControlDate.extend({
// 	set_date_options: function() {
// 		this._super();
// 		this.today_text = __("Now");
// 		this.date_format = moment.defaultDatetimeFormat;
// 		$.extend(this.datepicker_options, {
// 			timepicker: true,
// 			timeFormat: "hh:ii:ss"
// 		});
// 	},
// 	get_now_date: function() {
// 		return frappe.datetime.now_datetime(true);
// 	},
// 	set_description: function() {
// 		const { description } = this.df;
// 		const { time_zone } = frappe.sys_defaults;
// 		if (!frappe.datetime.is_timezone_same()) {
// 			if (!description) {
// 				this.df.description = time_zone;
// 			} else if (!description.includes(time_zone)) {
// 				this.df.description += '<br>' + time_zone;
// 			}
// 		}
// 		this._super();
// 	}
// });