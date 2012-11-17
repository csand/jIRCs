jIRCs.prototype.display = function(domobj) {
    if (!domobj) {
        var scripts = document.getElementsByTagName('script');
        domobj = scripts[scripts.length - 1].parentNode;
    }
    var container = document.createElement('table');
    var windowR = document.createElement('tr');
    var tabbarR = document.createElement('tr');
    var topicR = document.createElement('tr');
    var formR = document.createElement('tr');
    var formD = document.createElement('td');
    var windowD = document.createElement('td');
    var userlistD = document.createElement('td');
    var window = document.createElement('div');
    var tabbar = document.createElement('td');
    var topic = document.createElement('td');
    var userlist = document.createElement('div');
    var form = document.createElement('form');
    var input = document.createElement('input');
    var disobj = {
        'container': container,
        'messagebox': input,
        'tabBar': tabbar,
        'topic': topic,
        'userlist': userlist,
        'userlistD': userlistD,
        'form': form,
        'chatWindow': window,
        'channels': {},
        'window': '',
        'windowHistory': [],
        'height': domobj.clientHeight
    };
    container.className = "jircs_main";
    tabbar.className = "jircs_tabBar";
    topic.className = "jircs_topic";
    userlist.className = "jircs_userlist";
    form.className = "jircs_form";
    input.className = "jircs_input";
    window.className = "jircs_window";
    self = this;
    container.addEventListener("click", function(e) {
        if(e.target && e.target.className == 'jircs_channel_link') {
            self.send('JOIN',[e.target.innerHTML]);
            e.preventDefault();
        }
    });
    container.addEventListener("mousedown", function(e) {
        disobj.mouse = {'x':e.screenX,'y':e.screenY};
    });
    container.addEventListener("mouseup", function(e) {
        if(!('mouse' in disobj && 'x' in disobj.mouse && 'y' in disobj.mouse)) {
            input.focus();
        }
        var dx = disobj.mouse.x - e.screenX,
            dy = disobj.mouse.y - e.screenY;
        if(dx < 0) {
            dx *= -1;
        }
        if(dy < 0) {
            dy *= -1;
        }
        if(dx < 5 && dy < 5 && e.button == 0) { //Make sure text selection works as expected 
            input.focus();
        }
    });
    form.addEventListener("submit", function(e) {
        self.handleLine(input.value, disobj);
        input.value = '';
        e.preventDefault();
    });
    input.type = 'text';
    input.addEventListener("keydown", function(e) {
        var keyCode = e.keyCode || e.which; 
        if(keyCode == 9) {
            // Get cursor position
            var cursor = 0;
            if (e.target.createTextRange) {
                var r = document.selection.createRange().duplicate();
                r.moveEnd('character', e.target.value.length);
                if (r.text == '') {
                    cursor = e.target.value.length;
                }
                cursor = e.target.value.lastIndexOf(r.text);
            } else {
                cursor = e.target.selectionStart;
            }
            var begin = e.target.value.lastIndexOf(' ',cursor) + 1;
            var end = e.target.value.indexOf(' ',cursor);
            if(end == -1) {
                end = e.target.value.length;
            }
            var name = e.target.value.substring(begin,end);
            var possible = [];
            // Complete the name
            self.forEach(self.channels[disobj.window].users.array, function(user) {
                var n = user.nickname;
                var status = user.statusList;
                if(n.substring(0,name.length).toLowerCase() == name.toLowerCase()) {
                    possible.push(n);
                }
            }, self);
            if(possible.length == 1) {
                name = possible[0];
            } else if(possible.length == 0) {
                self.renderLine(disobj.window,'','No Possible Nicknames');
            } else {
                self.renderLine(disobj.window,'','Possible Nicknames: '+possible.join(' '));
            }
            e.target.value = e.target.value.substring(0,begin) + name + e.target.value.substr(end);
            e.preventDefault();
        }
    });
    form.appendChild(input);
    tabbar.colSpan = 2;
    topic.colSpan = 2;
    formD.colSpan = 2;
    formD.appendChild(form);
    windowD.appendChild(window);
    userlistD.appendChild(userlist);
    formR.appendChild(formD);
    windowR.appendChild(windowD);
    windowR.appendChild(userlistD);
    tabbarR.appendChild(tabbar);
    topicR.appendChild(topic);
    container.appendChild(tabbarR);
    container.appendChild(topicR);
    container.appendChild(windowR);
    container.appendChild(formR);
    domobj.appendChild(container);
    this.fixHeights(disobj);
    //set up Status window
    this.initChan("Status", disobj);
    this.activateChan("Status", disobj);
    this.displays.push(disobj);
};

jIRCs.prototype.initChan = function(channel, disobj) {
    var table = document.createElement('table');
    var tab = document.createElement('span');
    table.className = "jircs_chatTable";
    tab.className = "jircs_tab";
    tab.appendChild(document.createTextNode(channel));
    self = this;
    tab.addEventListener("click", function() {
        self.activateChan(channel, disobj);
    });
    if (channel != "Status") {
        var closeBtn = document.createElement("span");
        closeBtn.appendChild(document.createTextNode("X"));
        closeBtn.addEventListener("click", function() {
            self.destroyChan(channel);
        });
        closeBtn.className = "jircs_tab_closeBtn";
        tab.appendChild(closeBtn);
    }
    disobj.tabBar.appendChild(tab);
    table.style.display = "none"; //hide new channel
    // Insert empty row for style purposes
    var row = document.createElement('tr');
    var date = document.createElement('td');
    var user = document.createElement('td');
    var text = document.createElement('td');
    row.className = "jircs_chatRow";
    date.className = "jircs_chatDate";
    user.className = "jircs_chatUser";
    text.className = "jircs_chatText";
    row.appendChild(date);
    row.appendChild(user);
    row.appendChild(text);
    table.appendChild(row);
    disobj.chatWindow.appendChild(table);
    disobj.channels[channel] = {'table': table, 'tab': tab};
};

jIRCs.prototype.destroyChan = function(channel) {
    if (channel != 'Status' && channel in this.channels) {
        //part channel
        this.send("PART",[channel]);
        //Iterate through displays
        this.forEach(this.displays, function(disobj) {
            //remove from DOM
            disobj.tabBar.removeChild(disobj.channels[channel].tab);
            disobj.chatWindow.removeChild(disobj.channels[channel].table);
            //destroy
            delete(disobj.channels[channel]);
            if(channel == disobj.window) {
                //pick a channel to activate
                var newchan = disobj.windowHistory.pop();
                while (newchan && !disobj.channels[newchan]) {
                    newchan = disobj.windowHistory.pop() || false;
                }
                if(!newchan) {
                    newchan = 'Status';
                }
                this.activateChan(newchan, disobj);
            }
        }, this);
        delete(this.channels[channel]);
    }   
};

jIRCs.prototype.activateChan = function(channel, disobj) {
    if (disobj.channels[channel] && disobj.window != channel) {
        this.forEach(this.displays, function(idisobj) {
            this.forEach(idisobj.channels, function(c, chan) {
                var newClass = 'jircs_tab';
                if(idisobj == disobj) {
                    disobj.channels[chan].table.style.display = "none";
                } else if(c.tab.className.indexOf("jircs_tab_active") != -1) {
                    newClass += ' jircs_tab_active';
                }
                if(chan != channel) {
                    if(c.tab.className.indexOf("jircs_tab_attention") != -1) {
                        newClass += " jircs_tab_attention"
                    }
                    if(c.tab.className.indexOf("jircs_tab_hilight") != -1) {
                        newClass += " jircs_tab_hilight"
                    }
                }
                c.tab.className = newClass;  
            }, this);
        }, this);
        disobj.channels[channel].table.style.display = "table";
        disobj.channels[channel].tab.className += " jircs_tab_active";
        disobj.windowHistory.push(disobj.window);
        disobj.window = channel;
        this.renderTopic(disobj);
        this.renderUserlist(disobj);
    }
};

jIRCs.prototype.renderLine = function(channel, speaker, message, disobj) {
        if (!channel) {
            channel = "Status";
        }
        var now = new Date();
        var h = '' + now.getHours();
        var m = '' + now.getMinutes();
        var s = '' + now.getSeconds();
        var row = document.createElement('tr');
        var date = document.createElement('td');
        var user = document.createElement('td');
        var text = document.createElement('td');
        row.className = "jircs_chatRow";
        date.className = "jircs_chatDate";
        user.className = "jircs_chatUser";
        text.className = "jircs_chatText";
        date.appendChild(document.createTextNode('[' + (h.length > 1 ? h : '0'+h) + ':' + (m.length > 1 ? m : '0'+m) + ':' + (s.length > 1 ? s : '0'+s) + ']'));
        user.appendChild(document.createTextNode(speaker));
        text.appendChild(document.createTextNode(message));
        row.appendChild(date);
        if(speaker == '') {
            text.className += " jircs_action";
            text.colSpan = 2;
        } else {
            row.appendChild(user);
        }
        var nickCheck = new RegExp("\\b"+this.nickname+"\\b");
        if(nickCheck.test(message)) { // Hilight
            row.className += " jircs_hilight";
        }
        row.appendChild(text);
        text.innerHTML = this.formatLine(text.innerHTML);
        if(!(channel in this.channels)) {
            // Initiate channel
            this.channels[channel] = {
                'users': new jSortedList(jUserKeyFunc, jUserCmpFunc),
                'modes': {},
            };
        }
        // Track open channels
        var open = [];
        this.forEach(this.displays, function(d) {
            open.push(d.window);
        }, this);
        var displays = this.displays;
        if(disobj) {
            displays = [disobj];
        }
        this.forEach(displays, function(disobj) {
            if (!disobj.channels[channel]) {
                this.initChan(channel, disobj);
            }
            var b = (disobj.chatWindow.scrollHeight < disobj.chatWindow.clientHeight || disobj.chatWindow.scrollHeight <= disobj.chatWindow.scrollTop + disobj.chatWindow.clientHeight + 50); // 50px buffer just in case
            var r = row.cloneNode(true);
            disobj.channels[channel].table.appendChild(r);
            while(disobj.channels[channel].table.children.length > this.scrollbackSize) {
                disobj.channels[channel].table.removeChild(disobj.channels[channel].table.firstChild);
            }
            if(b) {
                disobj.chatWindow.scrollTop = disobj.chatWindow.scrollHeight - disobj.chatWindow.clientHeight; // Only scroll when user is at the bottom
            }
            if (open.indexOf(channel) == -1) {
                if(disobj.channels[channel].tab.className.indexOf("jircs_tab_attention") == -1) {
                    disobj.channels[channel].tab.className += " jircs_tab_attention";
                }
                if(disobj.channels[channel].tab.className.indexOf("jircs_tab_hilight") == -1 && nickCheck.test(message)) {
                    disobj.channels[channel].tab.className += " jircs_tab_hilight";
                }
            }
        }, this);
};

jIRCs.prototype.formatLine = function(line) {
    var depth = 0;
    var l = '';
    var bold = false;
    var italic = false;
    var underline = false;
    var color = { foreground: false, background: false, tmp: '', state: 0, set: false };
    this.forEach(line, function(c) {
        var rebuild = false;
        var defer = false;
        if(c == '\u0002') { // Bold
            if(bold) {
                rebuild = true;
            } else {
                l += '<span class="jircs_bold">';
                depth += 1;
            }
            bold = !bold;
        } else if(c == '\u0016') { // Reverse
            if (!color.foreground) {
                color.foreground = '1'; // The default foreground color is 1
            }
            if (!color.background) {
                color.background = '0'; // The default background color is 0
            }
            var swap = color.foreground;
            color.foreground = color.background;
            color.background = swap;
            if(color.set) {
                l += '<span>';
                depth += 1;
            } else {
                l += '<span><span>';
                depth += 2;
            }
            color.set = rebuild = true;
        } else if(c == '\u001D') { // Italic
            if(italic) {
                rebuild = true;
            } else {
                l += '<span class="jircs_italic">';
                depth += 1;
            }
            italic = !italic;
        } else if(c == '\u001F') { // Underline
            if(underline) {
                rebuild = true;
            } else {
                l += '<span class="jircs_underline">';
                depth += 1;
            }
            underline = !underline;
        } else if(c == '\u0003') { // Color
            color.state = 1;
        } else if(color.state == 1) {
            if(isNaN(parseInt(c))) {
                color.state = 0
                color.foreground = color.background = color.set = false;
                defer = rebuild = true;
            } else {
                color.tmp += c;
                color.state = 2;
            }
        } else if(color.state == 2) {
            if(isNaN(parseInt(c))) {
                color.foreground = color.tmp;
                color.tmp = '';
                if(c == ',') {
                    color.state = 3;
                } else {
                    color.state = 0;
                    defer = true;
                    depth += 1;
                    if(color.set) {
                        // Rebuild colors hack
                        l += '<span>';
                        rebuild = true;
                    } else {
                        color.set = true;
                        l += '<span class="jircs_color_foreground_' + parseInt(color.foreground) + '">';
                    }
                }
            } else {
                color.tmp += c;
            }
        } else if(color.state == 3) {
            if(isNaN(parseInt(c))) {
                if(color.tmp) {
                    color.background = color.tmp;
                }
                color.tmp = '';
                color.state = 0;
                defer = true;
                depth += 1;
                if(color.set) {
                    // Rebuild colors hack
                    l += '<span>';
                    rebuild = true;
                } else {
                    color.set = true;
                    l += '<span class="jircs_color_foreground_' + parseInt(color.foreground) + ' jircs_color_background_' + parseInt(color.background) + '">';
                }
            } else {
                color.tmp += c;
            }
        } else if(c == '\u000F') {
            l += this.repeat('</span>', depth);
            depth = 0;
            bold = italic = underline = color.foreground = color.background = color.set = false;
        } else {
            l += c;
        }
        if(rebuild) {
            l += this.repeat('</span>', depth);
            depth -= 1;
            if(bold) {
                l += '<span class="jircs_bold">';
            }
            if(italic) {
                l += '<span class="jircs_italic">';
            }
            if(underline) {
                l += '<span class="jircs_underline">';
            }
            if(color.foreground) {
                l += '<span class="jircs_color_foreground_' + parseInt(color.foreground);
                if(color.background) {
                    l += ' jircs_color_background_' + parseInt(color.background);
                }
                l += '">';
            }
        }
        if(defer) {
            l += c;
        }
    }, this);
    l += this.repeat('</span>', depth);
    l = l.replace(this.url_regex, this.linkMunger); // Auto-linkify links
    l = l.replace(/([>\s])(#[^\s\a,:]+?)([<\s])/ig,'$1<a href="$2" class="jircs_channel_link">$2</a>$3'); // Auto-linkify channels
    return l;
};

jIRCs.prototype.renderTopic = function(disobj) {
    disobj.topic.innerHTML = "";
    if(!(disobj.window in this.channels && this.channels[disobj.window].topic)) {
        this.fixHeights(disobj);
        return;
    }
    var tmsg = document.createElement('p');
    tmsg.appendChild(document.createTextNode(this.channels[disobj.window].topic.message));
    tmsg.className = 'jircs_topic_message';
    tmsg.innerHTML = this.formatLine(tmsg.innerHTML);
    disobj.topic.appendChild(tmsg);
    if(this.channels[disobj.window].topic.creator) {
        var tcreator = document.createElement('p');
        var msg = 'Set by ' + this.channels[disobj.window].topic.creator;
        if(this.channels[disobj.window].topic.time) { 
            var t = this.channels[disobj.window].topic.time;
            var h = '' + t.getHours();
            var m = '' + t.getMinutes();
            var s = '' + t.getSeconds();
            msg += ' on ' + (t.getMonth() + 1) + '/' + t.getDate() + '/' + t.getFullYear() + ' ' + (h.length > 1 ? h : '0'+h) + ':' + (m.length > 1 ? m : '0'+m) + ':' + (s.length > 1 ? s : '0'+s);
        }
        tcreator.appendChild(document.createTextNode(msg));
        tcreator.className = 'jircs_topic_creator';
        disobj.topic.appendChild(tcreator);
    }
    this.fixHeights(disobj);
};

jIRCs.prototype.renderUserlist = function(disobj) {
    if(!(disobj.window in this.channels)) {
        return;
    }
    disobj.userlist.innerHTML = "";
    disobj.userlistD.style.width = '0px';
    var users = {};
    var prefix = '', rank = '';
    var width = 0, height = 0;
    this.forEach(this.channels[disobj.window].users, function(user) {
        var u = user.nickname;
        var prefix = user.statusList;
        if(prefix.length) {
            prefix = prefix.charAt(0);
        }
        rank = prefix in this.statuses ? this.statuses[prefix] : '';
        if(!(rank in users)) {
            users[rank] = [];
        }
        users[rank].push(prefix + u);
    }, this);
    this.forEach(this.statusOrder, function(r) {
        if(!(r in users)) {
            return;
        }
        var ulist = users[r];
        // Case insensitive sort
        ulist.sort(function(a,b) { if(a.toLowerCase() > b.toLowerCase()) return 1; if(a.toLowerCase() < b.toLowerCase()) return -1; return 0;});
        console.log(ulist);
        this.forEach(ulist, function(u) {
            var p = document.createElement('p');
            p.appendChild(document.createTextNode(u));
            p.className = 'jircs_userlist_user';
            disobj.userlist.appendChild(p);
            var dim = this.measureText(u,'jircs_userlist_user');
            width = Math.max(dim["width"], width);
            height += dim["height"];
        }, this);
    }, this);
    // Account for scrollbar
    if(height > disobj.userlistD.clientHeight) {
        disobj.userlistD.style.width = (width + 20) + 'px';
    } else {
        disobj.userlistD.style.width = width + 'px';
    }
    if(disobj.channels[disobj.window].table.height > disobj.chatWindow.clientHeight) {
        disobj.channels[disobj.window].table.style.width = (disobj.chatWindow.clientWidth - 20) + 'px';
    } else {
        disobj.channels[disobj.window].table.style.width = disobj.chatWindow.clientWidth + 'px';
    }
    disobj.channels[disobj.window].table.style.display = 'table';
    disobj.userlist.scrollTop = 0;
};

jIRCs.prototype.fixHeights = function(disobj) {
    disobj.chatWindow.style.height = disobj.userlist.style.height = '0px';
    var h = (disobj.height - disobj.container.offsetHeight) + 'px';
    disobj.chatWindow.style.height = disobj.userlist.style.height = h;
};
