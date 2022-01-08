//Points to a div element where task combo will be inserted.
let taskDiv;
let addTaskResultDiv;
var numberOfWordsRead = 0;
//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    taskDiv = document.getElementById("TaskDiv");
    addTaskResultDiv = document.getElementById("AddTaskResult");
    loadSpeedoMeter();
}

//jquery to handle button clicks
$(document).ready(function () {
    $("#plusButton").click(function () {
        addTask();
        document.getElementById("taskInput").focus();
    });
    let content = ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus felis, laoreet ultrices faucibus quis, blandit nec ante. Donec consequat euismod mattis. Curabitur fermentum odio lacus, sit amet vulputate augue finibus vitae. Duis eget metus arcu. Donec at commodo ante. Maecenas facilisis feugiat lectus ut pulvinar. Proin id congue ante.\n" +
        "Quisque feugiat dui eget nulla feugiat, a dapibus ipsum porttitor. Pellentesque lectus tortor, ultrices eu justo ut, ornare cursus leo. Suspendisse nec volutpat mauris, ac volutpat lorem. Nulla ultrices vulputate nunc sed pharetra. Sed in semper velit. Cras sagittis purus quis eros dignissim, in feugiat metus sollicitudin. Cras vitae nibh ut enim ultrices porttitor sit amet non nisl. Mauris porttitor nisl nisi, eget hendrerit mi laoreet eu. Donec dapibus neque efficitur ullamcorper euismod. Quisque imperdiet velit eu magna scelerisque, ut blandit turpis convallis. Mauris quis sapien efficitur, efficitur tellus eget, cursus metus. Curabitur suscipit dolor ex, quis tempus tortor commodo non. Vestibulum ut sagittis lorem. Quisque lobortis eu est ut pulvinar. Nullam et metus eget tortor placerat aliquet sed at turpis.\n" +
        "Cras eu efficitur ligula. Aenean at metus enim. Morbi tristique rutrum magna, quis rhoncus odio dignissim at. Sed vestibulum arcu at scelerisque facilisis. Cras ultricies fringilla purus, et venenatis mauris interdum eu. Quisque et lacus dui. In elementum at tellus et dapibus. Sed molestie ante sit amet aliquet mattis. Donec tristique suscipit nunc a tempus. Integer viverra interdum orci sollicitudin placerat. Phasellus placerat justo dapibus mauris pulvinar, nec congue enim venenatis. Integer tempus at nunc finibus tincidunt. Aenean ut turpis erat. Mauris felis erat, vehicula in pretium sed, pharetra vitae odio. Nulla finibus risus a lectus blandit, eget laoreet libero interdum. Sed faucibus consectetur molestie.\n" +
        "Cras tempor fringilla lacus vel condimentum. Phasellus nec pulvinar orci. Nulla ac venenatis turpis. In efficitur et urna ac tempus. Pellentesque pellentesque dictum rhoncus. Praesent a dolor dui. Nullam imperdiet laoreet lectus.\n" +
        "Duis semper justo at ultrices mattis. Pellentesque cursus iaculis elit eu luctus. Maecenas commodo consequat tincidunt. Mauris semper aliquam dolor id ornare. Praesent id nunc a sem dictum congue vel vitae neque. Cras convallis, mi ut porta sagittis, velit enim venenatis arcu, at dapibus turpis ante sit amet lacus. Pellentesque blandit nulla id libero interdum semper. Morbi faucibus in quam sed sagittis. Aenean in purus malesuada, aliquam quam vitae, volutpat mi. Etiam vestibulum est arcu, non imperdiet enim auctor ut.\n" +
        "Sed commodo ligula mattis, varius mi sed, aliquam sem. Integer dapibus ante vitae justo fringilla sodales. Aenean a velit sed nibh varius gravida a ac quam. Nam tincidunt justo sed dapibus sodales. Nulla a magna vitae dui vestibulum tristique eu et libero. Nulla imperdiet sem nec mauris efficitur, in sagittis est aliquam. Cras nisl leo, rutrum non mi a, hendrerit varius dui. Mauris ante libero, dapibus dictum pharetra eget, fringilla non mauris. Suspendisse eget arcu consequat, ornare orci nec, aliquet ipsum. Vivamus suscipit tellus a fringilla feugiat. Proin vel faucibus quam. Nam volutpat ipsum vel diam rhoncus, in placerat velit ullamcorper. Curabitur ut rhoncus odio. Vestibulum eget ultrices diam, at porta neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer eu odio sed nisi hendrerit laoreet non in eros.\n" +
        "Curabitur in ultricies neque. Vivamus magna neque, mollis sed enim et, iaculis tempus mauris. Aliquam nec ex enim. Nullam imperdiet tempus orci ut commodo. Aliquam id odio ut odio posuere pharetra eu sit amet erat. Morbi tincidunt purus et aliquam vehicula. Maecenas pulvinar, magna eu porta vehicula, arcu mi molestie metus, quis iaculis magna lacus ac turpis. Duis eget risus ligula. Integer consequat gravida massa id egestas. Quisque suscipit nulla nibh, vitae blandit felis tempus id. Curabitur augue mi, efficitur sed mattis at, mattis a urna. Integer pulvinar lectus ut urna dignissim, ut feugiat justo iaculis. Vestibulum volutpat consequat purus eget porttitor. Nunc et turpis nec lorem faucibus eleifend a id lectus.\n" +
        "Fusce iaculis faucibus diam quis interdum. Donec varius fermentum nunc eu congue. Praesent sit amet leo at ante sagittis interdum. Aliquam vel varius magna, sit amet rutrum mauris. Morbi dignissim dapibus velit, et aliquam enim aliquet a. Vivamus eu lectus cursus, ultrices diam at, placerat risus. Suspendisse fringilla id quam vitae rutrum. Praesent rhoncus vehicula diam sed interdum. Phasellus feugiat leo eget purus mattis hendrerit. Ut eget eleifend dui. Maecenas molestie, tellus non interdum tristique, turpis augue posuere sapien, et maximus elit massa porttitor mauris. Morbi venenatis et eros nec aliquam.\n" +
        "Mauris euismod risus ut faucibus fringilla. In vel orci rhoncus, tempus ligula eget, tempor ante. Ut accumsan facilisis sapien sed efficitur. Aenean vel dictum nibh. Sed faucibus ante sit amet viverra lacinia. Proin ornare, dolor ac sagittis feugiat, justo quam interdum nisl, non facilisis erat lorem vel neque. Nunc ultricies dignissim est eget maximus. Maecenas pharetra non erat pulvinar suscipit. Nunc eu velit quis leo laoreet feugiat. Fusce convallis, quam at lacinia bibendum, ex nibh lacinia elit, in euismod velit elit eget dolor. Mauris ultrices feugiat justo sed porta. Aliquam interdum augue quam.\n" +
        "Nunc molestie finibus dolor a lobortis. Vivamus convallis pharetra congue. In ut finibus eros. Pellentesque feugiat vehicula massa, a tempus sem pulvinar sit amet. Curabitur sed nunc mauris. Donec vulputate augue eget nulla consequat, at finibus ipsum sagittis. Quisque eu egestas elit. Sed et consectetur metus. Aliquam non dapibus enim. Nam a ex lobortis, fringilla elit nec, tempus mauris. Vivamus finibus nunc vel libero scelerisque porttitor. Donec eu tortor sem. Pellentesque fringilla urna malesuada lorem imperdiet tempus.\n" +
        "Praesent quis massa maximus, pharetra dui aliquam, lacinia purus. Fusce sagittis dolor eu felis tristique, at convallis eros tristique. Maecenas vitae quam nec nisi aliquam sollicitudin nec eget sem. Quisque convallis odio in vehicula tempor. In non leo condimentum, consequat risus vitae, maximus nulla. Phasellus vitae ultricies lorem. Nulla cursus neque turpis, ac vehicula diam euismod ac. Donec vel efficitur massa. Donec porttitor nisl in elementum cursus.\n" +
        "Maecenas sed mollis nunc, eu lobortis sem. Sed viverra condimentum ante, at sagittis lorem. Nullam eget purus sed massa consequat fermentum non id metus. Curabitur in congue orci, quis elementum eros. Etiam congue ante posuere varius euismod. Aenean id ligula et enim luctus tempus. Nam quis ex odio. Praesent pellentesque, risus id fermentum finibus, risus felis tincidunt felis, vel hendrerit diam purus lacinia quam. Quisque pellentesque ac neque in luctus. Pellentesque dictum leo at gravida cursus. Curabitur sit amet sem a arcu eleifend laoreet eu sit amet mi. Morbi efficitur lorem mauris, rutrum aliquam diam vulputate non.\n" +
        "Donec aliquet, tellus et consectetur auctor, diam tortor gravida urna, eu semper justo neque at nunc. Nulla non bibendum mi, quis rhoncus est. In nunc ligula, faucibus a orci quis, cursus efficitur odio. Nam molestie purus eros, id ultricies quam dictum luctus. Phasellus vel nulla dignissim, luctus nibh et, malesuada sem. Aliquam gravida tincidunt felis sollicitudin efficitur. Quisque erat lorem, malesuada non justo nec, fringilla cursus mauris. Phasellus semper porttitor dignissim. Curabitur sit amet nunc ut ligula congue pharetra.\n" +
        "Curabitur in finibus ex. Suspendisse sit amet lectus ex. Donec sagittis arcu rutrum sodales sagittis. Praesent non ante et arcu aliquet aliquam. Praesent dignissim urna sit amet velit laoreet, eu dictum augue elementum. Quisque ullamcorper orci at dolor gravida porttitor. Morbi ut diam eget nisi gravida laoreet. Proin sagittis metus vel nibh vestibulum tempus. In hac habitasse platea dictumst. Morbi at tincidunt purus, ut pharetra elit. Pellentesque ac ex accumsan, sodales mi imperdiet, efficitur leo. Vivamus pharetra nisl est, sit amet cursus nunc accumsan ac. Cras finibus consequat mollis. Aliquam et eros auctor odio finibus gravida sit amet nec metus. Nam tristique nibh congue sem efficitur eleifend.\n" +
        "Vivamus sit amet porttitor sapien. Sed urna lacus, tempus ut auctor eu, ultricies id lorem. Aliquam ac dui tellus. Suspendisse facilisis, ipsum eu dictum dapibus, ligula eros volutpat odio, eget rhoncus risus leo at nibh. Fusce id tincidunt risus, eu elementum lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque quis metus sit amet sollicitudin. Suspendisse id nibh est. Mauris fringilla imperdiet sapien ut vulputate. Integer suscipit tortor vitae nunc dictum vulputate vitae nec arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n" +
        "Aenean nibh risus, egestas at eleifend id, efficitur eget turpis. Nunc eget dolor eu diam pellentesque gravida eu sodales eros. Donec gravida ac augue ut dapibus. Pellentesque eget tortor blandit, porttitor nisi ut, scelerisque ligula. Nunc interdum ante quis vulputate hendrerit. Ut commodo iaculis iaculis. Donec id volutpat tellus, quis facilisis ante. Phasellus lacus sem, gravida sed faucibus tempus, vestibulum aliquet mauris. Phasellus commodo volutpat sollicitudin. Praesent vulputate dui sit amet posuere efficitur. Fusce maximus consequat consequat.\n" +
        "Suspendisse mollis tortor vitae diam condimentum, eu egestas eros porttitor. Aliquam imperdiet metus sed pretium molestie. Proin blandit tempor turpis. Aenean ultrices enim felis, sit amet fermentum libero ullamcorper quis. Nulla condimentum condimentum tristique. Curabitur interdum semper nulla eget consequat. Vivamus vitae luctus nulla, in pellentesque nisl. Pellentesque aliquam imperdiet turpis, rhoncus venenatis orci efficitur nec. Pellentesque ut urna vitae felis tempus hendrerit quis quis justo. Morbi ac lectus eu enim fringilla rutrum.\n" +
        "Duis non laoreet est. Sed et tristique erat. Aliquam at massa massa. Fusce eget accumsan odio. Maecenas suscipit dui erat, vel pulvinar orci lacinia pellentesque. Nullam vulputate elementum semper. Mauris luctus ante quis massa egestas, vel accumsan ante lacinia. Ut laoreet pellentesque ante, vitae sagittis velit suscipit id.\n" +
        "Vivamus auctor velit in metus ultrices convallis vel ac arcu. Donec ullamcorper elementum turpis, quis dapibus nulla tempus commodo. Maecenas dapibus ante a nulla tincidunt, at accumsan nunc ultrices. Maecenas ligula nibh, faucibus eget odio in, fringilla interdum nibh. Aliquam felis lacus, tincidunt non sapien vitae, sollicitudin scelerisque ex. Aenean rutrum quam sit amet eros pulvinar aliquam. Aenean mattis accumsan felis, ut consequat nisi bibendum quis. Morbi risus libero, tincidunt eu viverra id, convallis in lacus. Vivamus at eros fringilla, placerat augue hendrerit, tempus risus. Sed laoreet nulla eros, non fringilla enim vestibulum ut. Etiam finibus neque quis erat euismod ultricies. Nunc vitae nisi eu urna commodo volutpat. In ut leo pharetra nisi venenatis lacinia. Nulla elementum porta tempus. Donec nec mattis elit. Cras dapibus nulla at nisi molestie, a pretium erat egestas.\n" +
        "Sed eget ornare tellus. Donec ac dignissim mauris. In hac habitasse platea dictumst. Donec feugiat eleifend tortor. Praesent in eros massa. Phasellus nec laoreet metus. Nulla sodales pretium turpis non lobortis. Aliquam eros odio, vulputate quis sollicitudin ut, blandit sed sem. Phasellus posuere est neque, ac interdum massa blandit a. Morbi turpis magna, elementum vitae orci sit amet, laoreet rhoncus mi. Aenean condimentum quam quis risus viverra volutpat.\n" +
        "Fusce massa lacus, egestas quis nisi sed, laoreet ultricies nisl. Quisque iaculis eros sed leo tempor, id elementum nibh dapibus. Donec vel molestie mi. Vestibulum pellentesque viverra aliquam. Donec scelerisque convallis volutpat. Mauris vitae tellus lorem. Etiam et finibus mauris. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In placerat elementum convallis. Nunc venenatis placerat enim, ut molestie nibh mattis nec. Aliquam condimentum in arcu vel ultrices. Curabitur tempus nisi ullamcorper, dignissim orci sit amet, tristique orci.\n" +
        "Nullam in purus sed arcu faucibus suscipit quis ut massa. Nullam congue felis vitae est bibendum, a sagittis nulla dictum. Phasellus aliquet, quam ut hendrerit lacinia, enim turpis efficitur augue, eget facilisis nunc neque eget ipsum. Nulla ornare mauris dui, ac mollis nunc elementum convallis. Sed in pulvinar tellus. Nullam hendrerit ipsum vel suscipit molestie. Curabitur mattis gravida urna vel lobortis. Morbi eu magna ac erat tincidunt ultricies tempor sit amet massa. Mauris interdum massa in odio laoreet lacinia. Sed ac enim arcu. Sed neque turpis, blandit sed dapibus a, euismod sit amet lacus.\n" +
        "Vivamus ligula nunc, tristique a mattis a, tempor vel eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus pretium magna purus, et interdum diam consectetur quis. Nulla vel auctor nibh. Sed tempus lacus ac urna molestie maximus. Cras finibus lorem porta urna ornare gravida. Cras ut congue nulla. Integer bibendum at ligula in vulputate. Nunc a metus hendrerit, pellentesque massa et, iaculis elit. Sed tempor tincidunt ornare.\n" +
        "Pellentesque nunc metus, condimentum non velit vel, interdum lacinia orci. Morbi sodales vitae nunc sed sagittis. In cursus, erat ut consectetur venenatis, est nibh mollis ex, non aliquet urna sapien at felis. Pellentesque a vehicula justo. Nunc quis magna quis nisi tempor molestie. Maecenas vel eros vitae orci aliquam bibendum ut vestibulum tortor. Aliquam dictum, libero vitae porttitor tristique, nisl neque interdum tellus, et fringilla mi lorem sed lorem. Nam imperdiet lacus eget metus efficitur, in ornare felis porta. Mauris rutrum arcu sit amet congue efficitur. Aenean consequat felis id tempus dignissim. Maecenas ante sem, scelerisque id ligula quis, lacinia mattis purus. Nulla facilisi. Nunc aliquam blandit lorem eu porta. Sed leo sem, fringilla sit amet faucibus pharetra, suscipit eget augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n" +
        "Ut ac volutpat orci. Mauris congue non augue sed pretium. Ut metus mauris, posuere non hendrerit vel, porta eu mauris. Nullam ac scelerisque erat. In sapien diam, auctor et ex id, sollicitudin congue erat. Aliquam suscipit nulla quis risus pharetra gravida. Proin volutpat, arcu vel interdum pretium, odio nisl eleifend ante, vestibulum gravida lacus velit dapibus tellus. Donec aliquet fermentum justo, et bibendum magna tincidunt et. Nulla lacinia, ante id lacinia condimentum, nulla ante pretium ex, eu eleifend orci urna ut leo. Aliquam tempus ante eu nulla molestie, vel facilisis metus suscipit. Mauris sed consequat dolor. Nulla ultricies volutpat semper.\n" +
        "Pellentesque sed pulvinar enim. Sed et maximus nulla. Maecenas eu efficitur erat, quis faucibus diam. Sed elit nisl, hendrerit eu euismod sed, posuere at sapien. Praesent dictum dolor purus, a luctus orci lacinia in. Fusce a velit eu quam mollis sodales sed id dolor. Suspendisse eu dignissim velit. Nunc commodo nulla sed ligula faucibus, ac gravida justo auctor. Pellentesque eu efficitur tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n" +
        "Duis vestibulum, mi ut rutrum accumsan, libero eros gravida nisl, in volutpat ante lacus id purus. Nullam tellus magna, porttitor non felis at, pulvinar molestie ligula. Integer ultricies sed metus vel venenatis. Proin sed arcu in lectus tempor luctus a a dui. Proin ut justo vel est mollis rhoncus. Vestibulum metus urna, euismod lacinia odio non, aliquet laoreet sapien. Mauris egestas suscipit urna eget sollicitudin. Nullam vel dapibus quam. Maecenas ac ullamcorper sem, nec hendrerit justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n" +
        "Sed pretium quis elit id euismod. Aenean euismod posuere dui sed volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec gravida feugiat pharetra. Sed pharetra at nulla vitae auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla vehicula, nisl et consectetur eleifend, est orci tristique est, vitae elementum eros elit quis neque. Vivamus eget erat vel nisi sollicitudin posuere. Vivamus ut lectus turpis.\n" +
        "Praesent consequat laoreet orci et finibus. Proin vel erat eu orci dictum faucibus nec ut elit. Nam id lacus dictum, pulvinar mi id, vestibulum turpis. Praesent placerat quam sit amet lacinia fringilla. Quisque euismod turpis et imperdiet pharetra. Aenean in accumsan sapien, sit amet hendrerit leo. Morbi id pharetra mi, eget maximus nisi. Nulla interdum sapien eu libero lobortis, sit amet maximus nisi bibendum. Ut eu nisi arcu. Aliquam egestas pharetra metus, vel rutrum purus. Praesent porttitor, tellus sit amet euismod vulputate, turpis justo porta dolor, eget interdum leo quam non nibh. Fusce id metus velit.\n" +
        "Suspendisse potenti. Proin tempus posuere consectetur. Nullam sagittis tellus sed nunc commodo laoreet ut vitae ante. Etiam velit leo, pharetra id nulla non, mattis faucibus magna. Aliquam id nulla at nunc pretium scelerisque malesuada aliquam purus. Nunc sollicitudin nisl a ligula fringilla luctus hendrerit ac orci. Nam interdum, nunc non consequat tempor, enim dui lacinia dui, ut iaculis erat odio nec enim.\n" +
        "Sed at cursus dui, ut ultrices elit. Nam non orci fermentum, maximus risus in, gravida felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer gravida libero at neque laoreet, nec bibendum nibh pellentesque. Maecenas bibendum eros et euismod accumsan. Vestibulum rhoncus odio at justo dapibus, non dapibus tellus mollis. Vivamus quis lectus eu massa iaculis lacinia a et est. Ut congue diam ut bibendum cursus. Nullam vel bibendum ipsum. Quisque pulvinar dui at tellus eleifend, non molestie tortor interdum. Curabitur varius nulla a ligula pulvinar placerat. Vivamus sit amet lectus sit amet risus sodales dapibus at eget augue. Nam pulvinar, dolor vitae auctor sollicitudin, enim felis aliquet turpis, vitae consectetur tellus odio nec elit. Vivamus ornare euismod quam vitae vehicula. Sed in ipsum non justo consectetur blandit.\n" +
        "Donec iaculis suscipit nisl, ut egestas justo maximus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin varius odio et lorem suscipit pellentesque. Sed dignissim sollicitudin sollicitudin. Phasellus sit amet ipsum urna. Nunc hendrerit sem vitae tellus facilisis, et interdum est pharetra. Sed id nulla risus. Proin sed sodales metus. Sed eget neque nulla. Integer diam erat, volutpat sed ligula sit amet, dapibus ullamcorper leo. Fusce id dui venenatis, auctor sapien nec, aliquet neque. Morbi eget efficitur lacus. Aenean congue nisl quis erat ultrices consectetur. Mauris convallis fermentum bibendum. Maecenas dignissim magna nec dui sollicitudin, sed gravida urna imperdiet.\n" +
        "Fusce ornare vel massa quis maximus. Donec consequat viverra nunc nec egestas. Sed tellus nibh, elementum vel mauris ut, fringilla volutpat odio. Vestibulum congue eros et odio dignissim, in bibendum diam luctus. Etiam porttitor purus diam, finibus convallis nunc volutpat id. Aenean vitae efficitur leo, id mattis purus. Quisque eleifend hendrerit massa id tincidunt. Nullam pellentesque neque id commodo sagittis. Ut metus enim, mattis vel vehicula quis, aliquam eleifend quam. Proin augue nisi, sollicitudin id lacus non, lacinia mattis arcu. Nam eu maximus tortor. Integer et justo elit. Morbi a porttitor quam. Mauris quam felis, blandit condimentum mattis eu, interdum a lectus. Phasellus dictum ornare rutrum. Cras a blandit metus.\n" +
        "Donec tristique consequat risus vitae rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus imperdiet accumsan tortor ac feugiat. Suspendisse quis nunc sed eros bibendum suscipit. Donec condimentum, turpis porttitor suscipit congue, neque ex porttitor neque, eget dignissim dui nisi id purus. Mauris eget nulla leo. Mauris consectetur velit ac arcu euismod vestibulum. Cras sagittis lacus urna, eu mattis quam venenatis eget.\n" +
        "Nam facilisis dolor sit amet odio tristique, id faucibus arcu tempor. Mauris sit amet eros eu turpis rhoncus viverra vel vel dui. Aenean et placerat ligula. In porta pulvinar est eget bibendum. Curabitur a ante nec nulla venenatis consectetur sit amet sed diam. Aenean tempus quam mauris, sit amet tincidunt dolor venenatis et. Etiam a lectus ac risus bibendum commodo. Nulla nec suscipit metus. Pellentesque a sem id diam efficitur pretium. Duis convallis finibus erat, quis congue ipsum iaculis a. Quisque euismod risus elit, sit amet vehicula velit placerat sed. Nunc pharetra dignissim aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ultricies orci sed ex malesuada dictum.\n" +
        "Sed consequat efficitur nibh, ac tincidunt tellus convallis quis. Quisque et mauris eu tortor faucibus interdum. Proin pharetra ipsum dui, non placerat augue ultricies in. Duis felis urna, malesuada ac turpis id, condimentum lobortis leo. Nulla vel velit justo. Etiam eget ante vel lorem ullamcorper convallis. Ut in malesuada diam. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n" +
        "Phasellus fermentum fringilla hendrerit. Curabitur dignissim, nulla a accumsan efficitur, lorem augue varius lectus, at semper nisl erat in dolor. Pellentesque at lobortis urna. Duis consequat sollicitudin arcu, quis sodales orci imperdiet sed. In hendrerit arcu ligula, vitae placerat odio egestas in. Duis vestibulum vitae lacus quis consectetur. Nam vitae pellentesque augue. Nulla consectetur justo quis malesuada ullamcorper. Maecenas felis libero, venenatis vel iaculis non, mattis at ante. Vestibulum malesuada ante ut augue dapibus tincidunt. Fusce suscipit ultrices felis vitae gravida. Donec congue vestibulum odio, consequat suscipit est congue sit amet. Proin eget eros non dolor auctor fermentum eget vel libero. Phasellus pharetra suscipit diam rhoncus cursus. Curabitur tristique purus urna, id commodo turpis condimentum eu. Phasellus fringilla felis quis posuere fringilla.\n" +
        "Sed consequat id magna id suscipit. Mauris vulputate congue lectus, in ullamcorper metus venenatis ut. Nam bibendum turpis non consequat mollis. Phasellus in justo tristique, ullamcorper magna et, aliquam nisl. Integer non imperdiet lorem. Proin condimentum turpis iaculis, vulputate augue ut, mollis lacus. Phasellus et sagittis nisl.\n" +
        "Donec dui nulla, vestibulum nec lobortis sit amet, condimentum id neque. Vivamus tincidunt blandit turpis, sit amet rhoncus justo rutrum vel. Pellentesque varius, elit eu semper tempor, urna dui gravida urna, ut pretium risus mi id justo. Aliquam tincidunt sollicitudin eros, at vulputate leo scelerisque in. Nullam sed enim ante. Mauris quam velit, fermentum a dictum at, consequat sit amet quam. Proin bibendum, eros sed tempus commodo, urna felis commodo metus, bibendum lacinia diam sapien ac odio. Cras posuere metus ac mi aliquam, pretium facilisis nulla tempor. Aenean at sem tellus. Pellentesque lobortis sed ligula ut elementum.\n" +
        "Mauris pellentesque, dui ut ultrices fermentum, orci erat efficitur lorem, eu convallis dui erat non urna. Curabitur vitae sodales nisi. Nam vulputate, augue nec consequat lacinia, nisi dui interdum elit, vitae tristique mauris ligula eget eros. Morbi a volutpat velit, nec hendrerit nisl. Quisque nec libero gravida libero congue ultricies in sed ante. Maecenas aliquam lacinia justo, vitae mollis turpis posuere sit amet. Praesent ut lacus ut lacus vestibulum congue ut nec sem.\n" +
        "Fusce scelerisque vel lacus vel efficitur. Aenean fermentum risus vitae viverra feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. In venenatis ipsum eget turpis maximus dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc pellentesque, felis id porta commodo, ligula ipsum ultricies tellus, nec sagittis urna elit sed odio. Nunc at cursus arcu. Curabitur in magna enim. Nam ac lectus faucibus mi sagittis ultricies. Ut et ante sit amet libero rutrum consequat. Aliquam scelerisque pharetra enim eu feugiat. Donec a convallis quam, quis ullamcorper risus. Mauris non rhoncus erat. Proin massa tellus, vestibulum ac congue vel, auctor sit amet enim. In varius, dui et sollicitudin aliquet, nulla tellus tincidunt velit, nec pellentesque metus mi ac nisi. Curabitur commodo elit sapien, vitae aliquet justo consequat ut.\n" +
        "Praesent vitae rutrum nisl. Pellentesque euismod vestibulum turpis at blandit. Donec vel pulvinar augue. Aenean ut felis quam. Etiam tempus mauris faucibus maximus rhoncus. Nam placerat, turpis commodo cursus mollis, velit lorem ornare nibh, eget hendrerit urna eros at nisi. Donec sed pharetra sem. Donec finibus euismod nibh, sed malesuada massa dignissim nec. Cras venenatis massa vitae velit cursus, faucibus congue nulla rutrum.\n" +
        "Nullam sed nisl eu orci mattis accumsan. Maecenas quis lectus purus. Pellentesque sit amet magna nulla. Aenean a aliquam diam. Phasellus a risus quis magna elementum rhoncus et non nisi. Ut magna nisi, fringilla vel nulla blandit, scelerisque fringilla metus. Aenean eu vestibulum sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet erat eros. In ac vulputate elit.\n" +
        "Phasellus lobortis sapien sagittis massa ultricies mollis. Nunc vulputate, nisi eget ultrices ornare, arcu nisl lacinia erat, eget pharetra libero lacus in arcu. Donec hendrerit luctus tortor, eget pulvinar risus. Etiam tristique laoreet sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor augue, laoreet eget neque euismod, ornare porttitor dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc id dui euismod, accumsan sem ut, ultrices dui. Integer efficitur mi vel purus bibendum, ac efficitur arcu varius. Etiam in erat suscipit, suscipit nunc eget, malesuada enim. Nullam sit amet aliquam lacus, a laoreet nunc. Maecenas in neque et mi congue semper sit amet in sapien. Suspendisse aliquam dolor risus, eu pulvinar velit efficitur id. Cras nisi erat, placerat eget accumsan vel, auctor non mauris.\n" +
        "Mauris lobortis enim vel magna pulvinar, non lacinia purus consectetur. Aenean at ipsum dapibus, mattis eros sit amet, bibendum eros. Duis in dui sem. Ut eget velit eget metus viverra maximus. Integer gravida dapibus hendrerit. Curabitur at libero placerat, luctus lacus nec, euismod quam. Nunc porta dapibus euismod.\n" +
        "Sed vel porttitor purus, at tempus nisi. Integer pharetra odio a finibus venenatis. Nunc molestie commodo ligula, vitae volutpat odio viverra sed. Suspendisse sagittis augue non tortor commodo, ut consequat turpis accumsan. In condimentum malesuada leo quis volutpat. Sed commodo lacus quam, at iaculis ante imperdiet vel. Aliquam varius est ut arcu feugiat euismod. Nulla augue nunc, consectetur sit amet bibendum sed, facilisis ac justo. Morbi ipsum magna, ornare id est vitae, malesuada luctus nisl. Fusce eleifend dolor facilisis finibus condimentum. Ut eget nibh in augue dapibus laoreet. Nunc iaculis aliquet lacinia. Phasellus convallis ullamcorper arcu, rhoncus porta sem ultricies sed. Morbi volutpat arcu sit amet quam vulputate iaculis. Quisque molestie pharetra laoreet. Duis vel molestie turpis.\n" +
        "Fusce scelerisque turpis lorem, vel ullamcorper odio malesuada eu. Aliquam faucibus placerat metus, ut volutpat leo bibendum eget. Integer facilisis a quam quis posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac habitasse platea dictumst. Phasellus id est mauris. Mauris non risus mi. In viverra leo at arcu tincidunt interdum. Nunc sem lacus, suscipit eget libero ac, accumsan sodales leo. Nam lorem mi, condimentum posuere nibh eget, pharetra vehicula tortor. Sed sed dui magna. Donec leo mauris, dictum at porttitor a, venenatis quis purus.\n" +
        "Suspendisse iaculis est turpis, ut malesuada dolor ultrices eu. Nulla placerat efficitur molestie. Cras tincidunt gravida neque sed tempus. Proin molestie lectus ipsum, quis consequat libero vulputate at. Vestibulum porta elementum dui, non dignissim urna blandit at. Mauris aliquet placerat venenatis. Donec neque nulla, ultrices non varius eget, convallis vel lorem. Pellentesque nec scelerisque nisl. Maecenas accumsan, turpis nec lobortis finibus, turpis mi dignissim felis, in molestie leo libero sed purus. Curabitur pulvinar rhoncus erat et lacinia. Morbi porta tristique dolor, in imperdiet dui condimentum ut.\n" +
        "Sed molestie interdum lectus id tempus. In vitae laoreet leo, ut aliquet sapien. Vestibulum tempus congue nisl, nec vestibulum nunc pharetra nec. Maecenas euismod elit neque, vel ornare ipsum porta vel. Vivamus nec mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sodales at mi convallis sollicitudin. Cras sed pellentesque quam. Sed mattis ex sed dictum efficitur. Nulla ac posuere mauris. In hac habitasse platea dictumst. Vestibulum non facilisis quam. In eget aliquam odio. Nam tincidunt ante at enim porta facilisis. Mauris quis magna pulvinar, molestie neque et, egestas purus.\n" +
        "Donec ut hendrerit dolor. In tellus mauris, tincidunt eget finibus vitae, malesuada quis velit. Mauris consectetur elit at risus rhoncus, in cursus elit dictum. Quisque luctus sollicitudin felis, sit amet sodales tortor facilisis ac. Nullam vitae nulla volutpat, condimentum odio sit amet, egestas leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed facilisis dui.");

    content = content.split(/\r?\n/);
    let linesPerPage = 5;
    let currentLineStart = 0;
    let numberOfLinesInPage = 2;
    loadNextPage(currentLineStart, content, numberOfLinesInPage);

    $(document).ready(function () {
        $(document).mousemove(function (event) {
            var heightOfDocument = $(document).height() - 50; //subtracted with 50 just to be safe with checking the condition below

            if (event.pageY > heightOfDocument) {
                alert("Opened next page");
                loadNextPage(currentLineStart, content, numberOfLinesInPage);
                currentLineStart = (currentLineStart + numberOfLinesInPage >= content.length ? content.length : currentLineStart + numberOfLinesInPage);
            }
        });
    });

});

function loadNextPage(currentLineStart, content, numberOfLinesInPage) {
    let pageContent = "";

    let upToLine = (currentLineStart + numberOfLinesInPage >= content.length ? content.length : currentLineStart + numberOfLinesInPage);

    if (currentLineStart <= content.length - 1) {
        for (currentLineStart; currentLineStart < upToLine; currentLineStart++)
            pageContent += content[currentLineStart];

        document.getElementById("pdfContent").innerHTML = pageContent;
    }

    addHighlightingToWords();
}

function addHighlightingToWords() {
    var words = $("#pdfContent").text().split(' ');
    $("#pdfContent").html("");
    let count = 1;
    $.each(words, function (i, val) {
//wrap each word in a span tag
        let word = $('<span/>').text(val + " ");
        word.addClass("" + count++);
        word.appendTo("#pdfContent");

    });
    $("#pdfContent").on("mouseover", 'span', function () {
//highlight a word when hovered

        if ($(this).css("background-color") != "rgb(255, 255, 255)") //ensures a word already visited is not applied to speed metric
        {
            let wordRead = $(this).attr("class");

            $('span').each(function (i, word) { //ensures words read are highlighted
                let iteratedWord = $(word).attr("class");
                if (parseInt(iteratedWord) <= parseInt(wordRead) + 3) {
                    $(word).css("background-color", "white");
                }
                console.log(wordRead + ' : ' + iteratedWord);
            });

            calculateSpeedMetric(wordRead);
        }
        $(this).css("background-color", "yellow");
    });
    $("#pdfContent").on("mouseout", 'span', function () {
//highlight a word when hovered

        if ($(this).css("background-color") != "rgb(0, 0, 255)") //doesn't color in a highlighted color
        {
            $(this).css("background-color", "white");
        }
    });
    $("#pdfContent").on("click", 'span', function (event) {
        event.stopPropagation();
        $("#pdfContent span").css("background-color", "white");
        let highlight = "blue";

        $(this).css("background-color", highlight);
        if ($(this).css("background-color", highlight) == "rgb(0, 0, 255)") {
            $(this).css("background-color", "white");
        }

        var text = $(this).text();

    });
}

//calculates speed metric and highlights all words from before
function calculateSpeedMetric(wordCount) {

    console.log(wordCount);
    this.gauge.set(parseInt(wordCount));
}

//highlights all words from before
function highlightPreviousWords(wordCount) {

}

    var opts = {
        angle: 0, // The span of the gauge arc
        lineWidth: 0.7, // The line thickness
        radiusScale: 0.5, // Relative radius
        pointer: {
            length: 0.37, // // Relative to gauge radius
            strokeWidth: 0.06, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#4BCF46',   // Colors
        colorStop: '#6060DA',    // just experiment with them
        strokeColor: '#E0E0E0',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
        // renderTicks is Optional
        renderTicks: {
            divisions: 2,
            divWidth: 0.1,
            divLength: 0.36,
            divColor: '#103305',
            subDivisions: 5,
            subLength: 0.59,
            subWidth: 5.2,
            subColor: '#381A66'
        }

    };
var target;
var gauge ;

function loadSpeedoMeter() {
    this.target =  document.getElementById('speedometer'); // your canvas element
    this.gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 500; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 66; // set animation speed (32 is default value)
    gauge.set(0); // set actual value
}

(function () {
    function t(t, i) {
        for (var e in i) m.call(i, e) && (t[e] = i[e]);

        function s() {
            this.constructor = t
        }

        return s.prototype = i.prototype, t.prototype = new s, t.__super__ = i.prototype, t
    }

    var i, e, s, n, o, p, a, h, r, l, g, c, u, d = [].slice, m = {}.hasOwnProperty, x = [].indexOf || function (t) {
        for (var i = 0, e = this.length; i < e; i++) if (i in this && this[i] === t) return i;
        return -1
    };

    function f(t, i) {
        null == t && (t = !0), this.clear = null == i || i, t && AnimationUpdater.add(this)
    }

    function v() {
        return v.__super__.constructor.apply(this, arguments)
    }

    function y(t, i) {
        this.el = t, this.fractionDigits = i
    }

    function V(t, i) {
        if (this.elem = t, this.text = null != i && i, V.__super__.constructor.call(this), void 0 === this.elem) throw new Error("The element isn't defined.");
        this.value = 1 * this.elem.innerHTML, this.text && (this.value = 0)
    }

    function w(t) {
        if (this.gauge = t, void 0 === this.gauge) throw new Error("The element isn't defined.");
        this.ctx = this.gauge.ctx, this.canvas = this.gauge.canvas, w.__super__.constructor.call(this, !1, !1), this.setOptions()
    }

    function S(t) {
        this.elem = t
    }

    function M(t) {
        var i, e;
        this.canvas = t, M.__super__.constructor.call(this), this.percentColors = null, "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), i = this.canvas.clientHeight, e = this.canvas.clientWidth, this.canvas.height = i, this.canvas.width = e, this.gp = [new p(this)], this.setOptions()
    }

    function C(t) {
        this.canvas = t, C.__super__.constructor.call(this), "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.setOptions(), this.render()
    }

    function _() {
        return _.__super__.constructor.apply(this, arguments)
    }

    !function () {
        var s, n, t, o, i, e, a;
        for (t = 0, i = (a = ["ms", "moz", "webkit", "o"]).length; t < i && (e = a[t], !window.requestAnimationFrame); t++) window.requestAnimationFrame = window[e + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"];
        s = null, o = 0, n = {}, requestAnimationFrame ? window.cancelAnimationFrame || (s = window.requestAnimationFrame, window.requestAnimationFrame = function (t, i) {
            var e;
            return e = ++o, s(function () {
                if (!n[e]) return t()
            }, i), e
        }, window.cancelAnimationFrame = function (t) {
            return n[t] = !0
        }) : (window.requestAnimationFrame = function (t, i) {
            var e, s, n, o;
            return e = (new Date).getTime(), o = Math.max(0, 16 - (e - n)), s = window.setTimeout(function () {
                return t(e + o)
            }, o), n = e + o, s
        }, window.cancelAnimationFrame = function (t) {
            return clearTimeout(t)
        })
    }(), u = function (t) {
        var i, e;
        for (t -= 3600 * (i = Math.floor(t / 3600)) + 60 * (e = Math.floor((t - 3600 * i) / 60)), t += "", e += ""; e.length < 2;) e = "0" + e;
        for (; t.length < 2;) t = "0" + t;
        return (i = i ? i + ":" : "") + e + ":" + t
    }, g = function () {
        var t, i, e;
        return e = (i = 1 <= arguments.length ? d.call(arguments, 0) : [])[0], t = i[1], r(e.toFixed(t))
    }, c = function (t, i) {
        var e, s, n;
        for (e in s = {}, t) m.call(t, e) && (n = t[e], s[e] = n);
        for (e in i) m.call(i, e) && (n = i[e], s[e] = n);
        return s
    }, r = function (t) {
        var i, e, s, n;
        for (s = (e = (t += "").split("."))[0], n = "", 1 < e.length && (n = "." + e[1]), i = /(\d+)(\d{3})/; i.test(s);) s = s.replace(i, "$1,$2");
        return s + n
    }, l = function (t) {
        return "#" === t.charAt(0) ? t.substring(1, 7) : t
    }, f.prototype.animationSpeed = 32, f.prototype.update = function (t) {
        var i;
        return null == t && (t = !1), !(!t && this.displayedValue === this.value || (this.ctx && this.clear && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), i = this.value - this.displayedValue, Math.abs(i / this.animationSpeed) <= .001 ? this.displayedValue = this.value : this.displayedValue = this.displayedValue + i / this.animationSpeed, this.render(), 0))
    }, t(v, h = f), v.prototype.displayScale = 1, v.prototype.forceUpdate = !0, v.prototype.setTextField = function (t, i) {
        return this.textField = t instanceof a ? t : new a(t, i)
    }, v.prototype.setMinValue = function (t, i) {
        var e, s, n, o, a;
        if (this.minValue = t, null == i && (i = !0), i) {
            for (this.displayedValue = this.minValue, a = [], s = 0, n = (o = this.gp || []).length; s < n; s++) e = o[s], a.push(e.displayedValue = this.minValue);
            return a
        }
    }, v.prototype.setOptions = function (t) {
        return null == t && (t = null), this.options = c(this.options, t), this.textField && (this.textField.el.style.fontSize = t.fontSize + "px"), .5 < this.options.angle && (this.options.angle = .5), this.configDisplayScale(), this
    }, v.prototype.configDisplayScale = function () {
        var t, i, e, s, n;
        return s = this.displayScale, !1 === this.options.highDpiSupport ? delete this.displayScale : (i = window.devicePixelRatio || 1, t = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1, this.displayScale = i / t), this.displayScale !== s && (n = this.canvas.G__width || this.canvas.width, e = this.canvas.G__height || this.canvas.height, this.canvas.width = n * this.displayScale, this.canvas.height = e * this.displayScale, this.canvas.style.width = n + "px", this.canvas.style.height = e + "px", this.canvas.G__width = n, this.canvas.G__height = e), this
    }, v.prototype.parseValue = function (t) {
        return t = parseFloat(t) || Number(t), isFinite(t) ? t : 0
    }, s = v, y.prototype.render = function (t) {
        return this.el.innerHTML = g(t.displayedValue, this.fractionDigits)
    }, a = y, t(V, h), V.prototype.displayedValue = 0, V.prototype.value = 0, V.prototype.setVal = function (t) {
        return this.value = 1 * t
    }, V.prototype.render = function () {
        var t;
        return t = this.text ? u(this.displayedValue.toFixed(0)) : r(g(this.displayedValue)), this.elem.innerHTML = t
    }, i = V, t(w, h), w.prototype.displayedValue = 0, w.prototype.value = 0, w.prototype.options = {
        strokeWidth: .035,
        length: .1,
        color: "#000000",
        iconPath: null,
        iconScale: 1,
        iconAngle: 0
    }, w.prototype.img = null, w.prototype.setOptions = function (t) {
        if (null == t && (t = null), this.options = c(this.options, t), this.length = 2 * this.gauge.radius * this.gauge.options.radiusScale * this.options.length, this.strokeWidth = this.canvas.height * this.options.strokeWidth, this.maxValue = this.gauge.maxValue, this.minValue = this.gauge.minValue, this.animationSpeed = this.gauge.animationSpeed, this.options.angle = this.gauge.options.angle, this.options.iconPath) return this.img = new Image, this.img.src = this.options.iconPath
    }, w.prototype.render = function () {
        var t, i, e, s, n, o, a, h, r;
        if (t = this.gauge.getAngle.call(this, this.displayedValue), h = Math.round(this.length * Math.cos(t)), r = Math.round(this.length * Math.sin(t)), o = Math.round(this.strokeWidth * Math.cos(t - Math.PI / 2)), a = Math.round(this.strokeWidth * Math.sin(t - Math.PI / 2)), i = Math.round(this.strokeWidth * Math.cos(t + Math.PI / 2)), e = Math.round(this.strokeWidth * Math.sin(t + Math.PI / 2)), this.ctx.beginPath(), this.ctx.fillStyle = this.options.color, this.ctx.arc(0, 0, this.strokeWidth, 0, 2 * Math.PI, !1), this.ctx.fill(), this.ctx.beginPath(), this.ctx.moveTo(o, a), this.ctx.lineTo(h, r), this.ctx.lineTo(i, e), this.ctx.fill(), this.img) return s = Math.round(this.img.width * this.options.iconScale), n = Math.round(this.img.height * this.options.iconScale), this.ctx.save(), this.ctx.translate(h, r), this.ctx.rotate(t + Math.PI / 180 * (90 + this.options.iconAngle)), this.ctx.drawImage(this.img, -s / 2, -n / 2, s, n), this.ctx.restore()
    }, p = w, S.prototype.updateValues = function (t) {
        return this.value = t[0], this.maxValue = t[1], this.avgValue = t[2], this.render()
    }, S.prototype.render = function () {
        var t, i;
        return this.textField && this.textField.text(g(this.value)), 0 === this.maxValue && (this.maxValue = 2 * this.avgValue), i = this.value / this.maxValue * 100, t = this.avgValue / this.maxValue * 100, $(".bar-value", this.elem).css({width: i + "%"}), $(".typical-value", this.elem).css({width: t + "%"})
    }, t(M, s), M.prototype.elem = null, M.prototype.value = [20], M.prototype.maxValue = 80, M.prototype.minValue = 0, M.prototype.displayedAngle = 0, M.prototype.displayedValue = 0, M.prototype.lineWidth = 40, M.prototype.paddingTop = .1, M.prototype.paddingBottom = .1, M.prototype.percentColors = null, M.prototype.options = {
        colorStart: "#6fadcf",
        colorStop: void 0,
        gradientType: 0,
        strokeColor: "#e0e0e0",
        pointer: {length: .8, strokeWidth: .035, iconScale: 1},
        angle: .15,
        lineWidth: .44,
        radiusScale: 1,
        fontSize: 40,
        limitMax: !1,
        limitMin: !1
    }, M.prototype.setOptions = function (t) {
        var i, e, s, n, o;
        for (null == t && (t = null), M.__super__.setOptions.call(this, t), this.configPercentColors(), this.extraPadding = 0, this.options.angle < 0 && (n = Math.PI * (1 + this.options.angle), this.extraPadding = Math.sin(n)), this.availableHeight = this.canvas.height * (1 - this.paddingTop - this.paddingBottom), this.lineWidth = this.availableHeight * this.options.lineWidth, this.radius = (this.availableHeight - this.lineWidth / 2) / (1 + this.extraPadding), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), e = 0, s = (o = this.gp).length; e < s; e++) (i = o[e]).setOptions(this.options.pointer), i.render();
        return this.render(), this
    }, M.prototype.configPercentColors = function () {
        var t, i, e, s, n, o, a;
        if (this.percentColors = null, void 0 !== this.options.percentColors) {
            for (this.percentColors = new Array, o = [], e = s = 0, n = this.options.percentColors.length - 1; 0 <= n ? s <= n : n <= s; e = 0 <= n ? ++s : --s) a = parseInt(l(this.options.percentColors[e][1]).substring(0, 2), 16), i = parseInt(l(this.options.percentColors[e][1]).substring(2, 4), 16), t = parseInt(l(this.options.percentColors[e][1]).substring(4, 6), 16), o.push(this.percentColors[e] = {
                pct: this.options.percentColors[e][0],
                color: {r: a, g: i, b: t}
            });
            return o
        }
    }, M.prototype.set = function (t) {
        var i, e, s, n, o, a, h, r, l;
        for (t instanceof Array || (t = [t]), e = s = 0, h = t.length - 1; 0 <= h ? s <= h : h <= s; e = 0 <= h ? ++s : --s) t[e] = this.parseValue(t[e]);
        if (t.length > this.gp.length) for (e = n = 0, r = t.length - this.gp.length; 0 <= r ? n < r : r < n; e = 0 <= r ? ++n : --n) (i = new p(this)).setOptions(this.options.pointer), this.gp.push(i); else t.length < this.gp.length && (this.gp = this.gp.slice(this.gp.length - t.length));
        for (a = e = 0, o = t.length; a < o; a++) (l = t[a]) > this.maxValue ? this.options.limitMax ? l = this.maxValue : this.maxValue = l + 1 : l < this.minValue && (this.options.limitMin ? l = this.minValue : this.minValue = l - 1), this.gp[e].value = l, this.gp[e++].setOptions({
            minValue: this.minValue,
            maxValue: this.maxValue,
            angle: this.options.angle
        });
        return this.value = Math.max(Math.min(t[t.length - 1], this.maxValue), this.minValue), AnimationUpdater.add(this), AnimationUpdater.run(this.forceUpdate), this.forceUpdate = !1
    }, M.prototype.getAngle = function (t) {
        return (1 + this.options.angle) * Math.PI + (t - this.minValue) / (this.maxValue - this.minValue) * (1 - 2 * this.options.angle) * Math.PI
    }, M.prototype.getColorForPercentage = function (t, i) {
        var e, s, n, o, a, h, r;
        if (0 === t) e = this.percentColors[0].color; else for (e = this.percentColors[this.percentColors.length - 1].color, n = o = 0, h = this.percentColors.length - 1; 0 <= h ? o <= h : h <= o; n = 0 <= h ? ++o : --o) if (t <= this.percentColors[n].pct) {
            e = !0 === i ? (r = this.percentColors[n - 1] || this.percentColors[0], s = this.percentColors[n], a = (t - r.pct) / (s.pct - r.pct), {
                r: Math.floor(r.color.r * (1 - a) + s.color.r * a),
                g: Math.floor(r.color.g * (1 - a) + s.color.g * a),
                b: Math.floor(r.color.b * (1 - a) + s.color.b * a)
            }) : this.percentColors[n].color;
            break
        }
        return "rgb(" + [e.r, e.g, e.b].join(",") + ")"
    }, M.prototype.getColorForValue = function (t, i) {
        var e;
        return e = (t - this.minValue) / (this.maxValue - this.minValue), this.getColorForPercentage(e, i)
    }, M.prototype.renderStaticLabels = function (t, i, e, s) {
        var n, o, a, h, r, l, p, c, u, d;
        for (this.ctx.save(), this.ctx.translate(i, e), l = /\d+\.?\d?/, r = (n = t.font || "10px Times").match(l)[0], c = n.slice(r.length), o = parseFloat(r) * this.displayScale, this.ctx.font = o + c, this.ctx.fillStyle = t.color || "#000000", this.ctx.textBaseline = "bottom", this.ctx.textAlign = "center", a = 0, h = (p = t.labels).length; a < h; a++) void 0 !== (d = p[a]).label ? (!this.options.limitMin || d >= this.minValue) && (!this.options.limitMax || d <= this.maxValue) && (r = (n = d.font || t.font).match(l)[0], c = n.slice(r.length), o = parseFloat(r) * this.displayScale, this.ctx.font = o + c, u = this.getAngle(d.label) - 3 * Math.PI / 2, this.ctx.rotate(u), this.ctx.fillText(g(d.label, t.fractionDigits), 0, -s - this.lineWidth / 2), this.ctx.rotate(-u)) : (!this.options.limitMin || d >= this.minValue) && (!this.options.limitMax || d <= this.maxValue) && (u = this.getAngle(d) - 3 * Math.PI / 2, this.ctx.rotate(u), this.ctx.fillText(g(d, t.fractionDigits), 0, -s - this.lineWidth / 2), this.ctx.rotate(-u));
        return this.ctx.restore()
    }, M.prototype.renderTicks = function (t, i, e, s) {
        var n, o, a, h, r, l, p, c, u, d, g, m, x, f, v, y, V, w, S, M;
        if (t !== {}) {
            for (l = t.divisions || 0, w = t.subDivisions || 0, a = t.divColor || "#fff", f = t.subColor || "#fff", h = t.divLength || .7, y = t.subLength || .2, u = parseFloat(this.maxValue) - parseFloat(this.minValue), d = parseFloat(u) / parseFloat(t.divisions), v = parseFloat(d) / parseFloat(t.subDivisions), n = parseFloat(this.minValue), o = 0 + v, r = (c = u / 400) * (t.divWidth || 1), V = c * (t.subWidth || 1), m = [], S = p = 0, g = l + 1; p < g; S = p += 1) this.ctx.lineWidth = this.lineWidth * h, x = this.lineWidth / 2 * (1 - h), M = this.radius * this.options.radiusScale + x, this.ctx.strokeStyle = a, this.ctx.beginPath(), this.ctx.arc(0, 0, M, this.getAngle(n - r), this.getAngle(n + r), !1), this.ctx.stroke(), o = n + v, n += d, S !== t.divisions && 0 < w ? m.push(function () {
                var t, i, e;
                for (e = [], t = 0, i = w - 1; t < i; t += 1) this.ctx.lineWidth = this.lineWidth * y, x = this.lineWidth / 2 * (1 - y), M = this.radius * this.options.radiusScale + x, this.ctx.strokeStyle = f, this.ctx.beginPath(), this.ctx.arc(0, 0, M, this.getAngle(o - V), this.getAngle(o + V), !1), this.ctx.stroke(), e.push(o += v);
                return e
            }.call(this)) : m.push(void 0);
            return m
        }
    }, M.prototype.render = function () {
        var t, i, e, s, n, o, a, h, r, l, p, c, u, d, g, m;
        if (g = this.canvas.width / 2, e = this.canvas.height * this.paddingTop + this.availableHeight - (this.radius + this.lineWidth / 2) * this.extraPadding, t = this.getAngle(this.displayedValue), this.textField && this.textField.render(this), this.ctx.lineCap = "butt", l = this.radius * this.options.radiusScale, this.options.staticLabels && this.renderStaticLabels(this.options.staticLabels, g, e, l), this.options.staticZones) for (this.ctx.save(), this.ctx.translate(g, e), this.ctx.lineWidth = this.lineWidth, s = 0, o = (p = this.options.staticZones).length; s < o; s++) r = (m = p[s]).min, this.options.limitMin && r < this.minValue && (r = this.minValue), h = m.max, this.options.limitMax && h > this.maxValue && (h = this.maxValue), d = this.radius * this.options.radiusScale, m.height && (this.ctx.lineWidth = this.lineWidth * m.height, u = this.lineWidth / 2 * (m.offset || 1 - m.height), d = this.radius * this.options.radiusScale + u), this.ctx.strokeStyle = m.strokeStyle, this.ctx.beginPath(), this.ctx.arc(0, 0, d, this.getAngle(r), this.getAngle(h), !1), this.ctx.stroke(); else void 0 !== this.options.customFillStyle ? i = this.options.customFillStyle(this) : null !== this.percentColors ? i = this.getColorForValue(this.displayedValue, this.options.generateGradient) : void 0 !== this.options.colorStop ? ((i = 0 === this.options.gradientType ? this.ctx.createRadialGradient(g, e, 9, g, e, 70) : this.ctx.createLinearGradient(0, 0, g, 0)).addColorStop(0, this.options.colorStart), i.addColorStop(1, this.options.colorStop)) : i = this.options.colorStart, this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.arc(g, e, l, (1 + this.options.angle) * Math.PI, t, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.stroke(), this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(g, e, l, t, (2 - this.options.angle) * Math.PI, !1), this.ctx.stroke(), this.ctx.save(), this.ctx.translate(g, e);
        for (this.options.renderTicks && this.renderTicks(this.options.renderTicks, g, e, l), this.ctx.restore(), this.ctx.translate(g, e), n = 0, a = (c = this.gp).length; n < a; n++) c[n].update(!0);
        return this.ctx.translate(-g, -e)
    }, o = M, t(C, s), C.prototype.lineWidth = 15, C.prototype.displayedValue = 0, C.prototype.value = 33, C.prototype.maxValue = 80, C.prototype.minValue = 0, C.prototype.options = {
        lineWidth: .1,
        colorStart: "#6f6ea0",
        colorStop: "#c0c0db",
        strokeColor: "#eeeeee",
        shadowColor: "#d5d5d5",
        angle: .35,
        radiusScale: 1
    }, C.prototype.getAngle = function (t) {
        return (1 - this.options.angle) * Math.PI + (t - this.minValue) / (this.maxValue - this.minValue) * (2 + this.options.angle - (1 - this.options.angle)) * Math.PI
    }, C.prototype.setOptions = function (t) {
        return null == t && (t = null), C.__super__.setOptions.call(this, t), this.lineWidth = this.canvas.height * this.options.lineWidth, this.radius = this.options.radiusScale * (this.canvas.height / 2 - this.lineWidth / 2), this
    }, C.prototype.set = function (t) {
        return this.value = this.parseValue(t), this.value > this.maxValue ? this.options.limitMax ? this.value = this.maxValue : this.maxValue = this.value : this.value < this.minValue && (this.options.limitMin ? this.value = this.minValue : this.minValue = this.value), AnimationUpdater.add(this), AnimationUpdater.run(this.forceUpdate), this.forceUpdate = !1
    }, C.prototype.render = function () {
        var t, i, e, s;
        return t = this.getAngle(this.displayedValue), s = this.canvas.width / 2, e = this.canvas.height / 2, this.textField && this.textField.render(this), (i = this.ctx.createRadialGradient(s, e, 39, s, e, 70)).addColorStop(0, this.options.colorStart), i.addColorStop(1, this.options.colorStop), this.radius, this.lineWidth, this.radius, this.lineWidth, this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(s, e, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.lineCap = "round", this.ctx.stroke(), this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.arc(s, e, this.radius, (1 - this.options.angle) * Math.PI, t, !1), this.ctx.stroke()
    }, t(_, e = C), _.prototype.strokeGradient = function (t, i, e, s) {
        var n;
        return (n = this.ctx.createRadialGradient(t, i, e, t, i, s)).addColorStop(0, this.options.shadowColor), n.addColorStop(.12, this.options._orgStrokeColor), n.addColorStop(.88, this.options._orgStrokeColor), n.addColorStop(1, this.options.shadowColor), n
    }, _.prototype.setOptions = function (t) {
        var i, e, s, n;
        return null == t && (t = null), _.__super__.setOptions.call(this, t), n = this.canvas.width / 2, i = this.canvas.height / 2, e = this.radius - this.lineWidth / 2, s = this.radius + this.lineWidth / 2, this.options._orgStrokeColor = this.options.strokeColor, this.options.strokeColor = this.strokeGradient(n, i, e, s), this
    }, n = _, window.AnimationUpdater = {
        elements: [], animId: null, addAll: function (t) {
            var i, e, s, n;
            for (n = [], e = 0, s = t.length; e < s; e++) i = t[e], n.push(AnimationUpdater.elements.push(i));
            return n
        }, add: function (t) {
            if (x.call(AnimationUpdater.elements, t) < 0) return AnimationUpdater.elements.push(t)
        }, run: function (t) {
            var i, e, s, n, o, a, h;
            if (null == t && (t = !1), isFinite(parseFloat(t)) || !0 === t) {
                for (i = !0, h = [], s = e = 0, o = (a = AnimationUpdater.elements).length; e < o; s = ++e) a[s].update(!0 === t) ? i = !1 : h.push(s);
                for (n = h.length - 1; 0 <= n; n += -1) s = h[n], AnimationUpdater.elements.splice(s, 1);
                return AnimationUpdater.animId = i ? null : requestAnimationFrame(AnimationUpdater.run)
            }
            if (!1 === t) return !0 === AnimationUpdater.animId && cancelAnimationFrame(AnimationUpdater.animId), AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run)
        }
    }, "function" == typeof window.define && null != window.define.amd ? define(function () {
        return {Gauge: o, Donut: n, BaseDonut: e, TextRenderer: a}
    }) : "undefined" != typeof module && null != module.exports ? module.exports = {
        Gauge: o,
        Donut: n,
        BaseDonut: e,
        TextRenderer: a
    } : (window.Gauge = o, window.Donut = n, window.BaseDonut = e, window.TextRenderer = a)
}).call(this);