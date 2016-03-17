(function($){
	$(function(){
		window.validateEvn = validateEvn;
		validateEvn.init();

	});
	var validateEvn = {
		// 输入表单验证验证
		validate : function(options,callback){
			var defaults = {
				inputObj : null,//验证的对象
				required : true,//是否必填
				sreg : '',//特殊字符，写正则，为空表示不需要验证特殊字符
				reg : '',//正则表达式，为空不验证
				lType : 0,//0表示中文等字体占一个字符，1表示中文等字体占2个字符
				min : -1,//最小长度
				max : -1,//最大长度
				tip : '',//正则自定义错误提示
			};

			this.callback = callback;

			var valOptions = $.extend(defaults, options),
			$inputObj = valOptions.inputObj;

			// 判断输入对象是否存在
			if($inputObj.length <= 0){
				return false;
			}

			var	inputVal = $inputObj.val(),
			inputLen = inputVal.length;
			// 长度类型判断
			if(valOptions.lType == 1){
				inputLen = inputVal.match(/[^ -~]/g) == null ? inputVal.length : inputVal.length + inputVal.match(/[^ -~]/g).length;
			}

			// 验证是否为空
			if(valOptions.required){
				if(inputVal == ""){
					validateEvn.validationTxtTips($inputObj,0);
					return false;
				}
			}

			// 验证特殊字符
			if(valOptions.sreg != ""){
				var sreg = valOptions.sreg;
				if(!sreg.test(inputVal)){
					validateEvn.validationTxtTips($inputObj,1);
					return false;
				}
			}

			// 验证字段长度
			if(valOptions.min > 0){
				if(inputLen < valOptions.min){
					validateEvn.validationTxtTips($inputObj,2);
					return false;
				}
			}

			if(valOptions.max > 0){
				if(inputLen > valOptions.max){
					validateEvn.validationTxtTips($inputObj,2);
					return false;
				}			
			}

			// 正则匹配
			if(valOptions.reg!=""){
				if(!valOptions.reg.test(inputVal)){
					if(valOptions.tip!=""){
						validateEvn.validationTxtTips($inputObj,4,valOptions.tip);
					}else{
						validateEvn.validationTxtTips($inputObj,2);
					}
					return false;
				}
			}

			// 验证通过
			validateEvn.validationTxtTips($inputObj,-1);
			return true;

		},
		// 表单验证错误提示
		validationTxtTips : function(inputObj,type,errtip){

			var txt = '',
				$tips = inputObj.parent().find('.tips'),
			   	name = inputObj.attr('data-name') || '';

			switch(type){
				case 0 :
					// 为空
					txt = name+'不能为空';
					break;
				case 1 :
					// 特殊字符
					txt = name+'不能含有特殊字符';
					break;
				case 2 :
					//格式错误
					txt = name+'格式不正确';
					break;
				case 3 :
					//确认密码输入错误
					txt = '两次输入的密码不一致';
					break;
				case 4 :
					//自定义
					txt = errtip;
					break;
				default :
					// 缺省
					txt = '&nbsp;';
					break;
			}

			// 提示
			if(validateEvn.callback!=undefined){
				validateEvn.callback({
					inObj:inputObj,
					tips:txt
				});
			}
		},	
		init : function(){
			// 验证表单的正则表达式
			this.rex = {
				// 整数
				integer : /^[1-9]\d*$/,
				// 0-9的数字
				integer2 : /^[0-9]\d*$/,
				//1-100的数字
				// integer3 : /^[1-100]\d*$/,
				integer3 :/^([1-9]\d?|100)$/,
				// 数字
				num : /^\d+(\.\d+)?$/,
				// 邮箱
				email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
				// 昵称（下划线、字母、数字、汉字开头）
				nickname: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
				// 密码 6-16位
				password: /^\w{6,16}$/,
				// 电话号码
				tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
				// 手机号码
				// phone: /^\w{11}$/,
				phone: /^[1]\d{10}$/,
				// 邮件地址特殊字符
				emailSreg: /[`~!#$%^&*+<>{}\/'[\]]/im,
				// 数字的特殊字符
				numChar: /[`~!@#$%^&*-+<>{}\/'[\]]/im,
				// 特殊字符
				// specialChar: /[`~!@#$%^&*-+.<>{}\/'[\]]/im,
				specialChar: /[`~@#$%^&*<>{}\/'[\]]/im,
				// 网址
				url: /^(https?|ftp|mms):\/\/([A-z0-9_\-]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/
			};	
		}

	};
}(jQuery));