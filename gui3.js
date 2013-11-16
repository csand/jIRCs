jIRCs.prototype.display = function(container) {
    if (!container) {
        var scripts = document.getElementsByTagName('script');
        container = scripts[scripts.length - 1].parentNode;
    }
    
    // Create the DOM
    var header = document.createElement('div');
    var content = document.createElement('div');
    var footer = document.createElement('div');
    var tabbar = document.createElement('div');
    var topic = document.createElement('div');
    var auction = document.createElement('div');
    var chat = document.createElement('div');
    var messages_wrapper = document.createElement('div');
    var messages = document.createElement('div');
    var butts = document.createElement('img');
    var notification = document.createElement('div');
    var userlist = document.createElement('div');
    var inputbar = document.createElement('div');
    var status = document.createElement('div');
    var form = document.createElement('form');
    var name = document.createElement('label');
    var input = document.createElement('input');
    var send = document.createElement('input');
    var status_normal = document.createElement("div");
    var status_connected = document.createElement("span");
    var status_account = document.createElement("span");
    var status_special = document.createElement("div");
    var status_gethelp = document.createElement("a");
    var status_hideulist = document.createElement("a");
    var status_hideauction = document.createElement("a");
    var status_buttmode = document.createElement("a");
    var status_kappa = document.createElement("a");
    var auction_image = document.createElement("img");
    var auction_holder = document.createElement("div");
    var auction_title = document.createElement("div");
    var auction_bidder = document.createElement("div");
    var auction_bid = document.createElement("div");
    var auction_smack = document.createElement("div");
    var auction_form = document.createElement("form");
    var auction_form_header = document.createElement("div");
    var auction_form_bid = document.createElement("div");
    var auction_form_smack = document.createElement("div");
    var auction_form_submit = document.createElement("div");
    var auction_form_bid_label = document.createElement("label");
    var auction_form_bid_input = document.createElement("input");
    var auction_form_smack_label = document.createElement("label");
    var auction_form_smack_input = document.createElement("input");
    var auction_form_submit_input = document.createElement("input");
    
    // Save the display object
    var disobj = {
        // DOM
        'container': container,
        'header': header,
        'content': content,
        'footer': footer,
        'tabbar': tabbar,
        'topic': topic,
        'auction': auction,
        'chat': chat,
        'messages_wrapper': messages_wrapper,
        'messages': messages,
        'butts': butts,
        'notification': notification,
        'userlist': userlist,
        // How much do we skew our measurements by?
        'fudgeFactor': 4,
        'inputbar': inputbar,
        'status': status,
        'form': form,
        'name': name,
        'input': input,
        'send': send,
        'status_normal': status_normal,
        'status_connected': status_connected,
        'status_account': status_account,
        'status_special': status_special,
        'status_gethelp': status_gethelp,
        'status_hideulist': status_hideulist,
        'status_hideauction': status_hideauction,
        'status_buttmode': status_buttmode,
        'status_kappa': status_kappa,
        'auction_image': auction_image,
        'auction_holder': auction_holder,
        'auction_title': auction_title,
        'auction_bidder': auction_bidder,
        'auction_bid': auction_bid,
        'auction_smack': auction_smack,
        'auction_form': auction_form,
        'auction_form_header': auction_form_header,
        'auction_form_bid': auction_form_bid,
        'auction_form_smack': auction_form_smack,
        'auction_form_submit': auction_form_submit,
        'auction_form_bid_label': auction_form_bid_label,
        'auction_form_bid_input': auction_form_bid_input,
        'auction_form_smack_label': auction_form_smack_label,
        'auction_form_smack_input': auction_form_smack_input,
        'auction_form_submit_input': auction_form_submit_input,
        // Vars
        'viewing': '',
        'tabs': {},
        'lines': {},
        'history': [],
        'options': {
            'show_userlist': true,
            'show_auction': true,
            'butt_mode': false,
            'kappa': false
        },
        'auction_running': false,
        'note_timer': false,
        'userInsertCallback': null,
        'userRemoveCallback': null,
    };
    
    // Set all them fancy classes
    container.className = "jircs_main";
    header.className = "jircs_header";
    content.className = "jircs_content";
    footer.className = "jircs_footer";
    tabbar.className = "jircs_tabbar";
    topic.className = "jircs_topic";
    auction.className = "jircs_auction";
    chat.className = "jircs_chat";
    messages_wrapper.className = "jircs_messages_wrapper";
    messages.className = "jircs_messages";
    butts.className = "jircs_butts";
    notification.className = "jircs_notification";
    userlist.className = "jircs_userlist";
    inputbar.className = "jircs_inputbar";
    status.className = "jircs_status";
    form.className = "jircs_form";
    name.className = "jircs_name";
    input.className = "jircs_input";
    send.className = "jircs_send";
    status_normal.className = "jircs_status_normal";
    status_connected.className = "jircs_status_connected";
    status_account.className = "jircs_status_account";
    status_special.className = "jircs_status_special";
    status_gethelp.className = "jircs_status_gethelp";
    status_hideulist.className = "jircs_status_hideulist";
    status_hideauction.className = "jircs_status_hideauction";
    auction_image.className = "jircs_auction_image";
    auction_holder.className = "jircs_auction_holder";
    auction_title.className = "jircs_auction_title";
    auction_bidder.className = "jircs_auction_bidder";
    auction_bid.className = "jircs_auction_bid";
    auction_smack.className = "jircs_auction_smack";
    auction_form.className = "jircs_auction_form";
    auction_form_header.className = "jircs_auction_form_header";
    auction_form_bid.className = "jircs_auction_form_bid";
    auction_form_smack.className = "jircs_auction_form_smack";
    auction_form_submit.className = "jircs_auction_form_submit";
    auction_form_bid_label.className = "jircs_auction_form_bid_label";
    auction_form_bid_input.className = "jircs_auction_form_bid_input";
    auction_form_smack_label.className = "jircs_auction_form_smack_label";
    auction_form_smack_input.className = "jircs_auction_form_smack_input";
    auction_form_submit_input.className = "jircs_auction_form_submit_input";
    
    // Set values and styles
    input.type = 'text';
    send.type = "submit";
    send.value = "Send";
    butts.src = "http://instant-grat.com/db6/grahambootyshake.gif";
    messages.style.display = disobj.options.butt_mode ? "none" : "block";
    butts.style.display = disobj.options.butt_mode ? "block" : "none";
    status_connected.innerHTML = this.connected ? "Connected" : "Disconnected";
    status_account.appendChild(document.createTextNode(this.account ? "Logged in as "+this.account : "Not Logged In"));
    status_gethelp.href = "#";
    status_hideulist.href = "#";
    status_hideauction.href = "#";
    status_buttmode.href = "#";
    status_kappa.href = "#";
    status_gethelp.innerHTML = "Get Help";
    status_hideulist.innerHTML = disobj.options.show_userlist ? "Hide Users" : "Show Users";
    status_hideauction.innerHTML = disobj.options.show_auction ? "Hide Auction Bar" : "Show Auction Bar";
    status_buttmode.innerHTML = disobj.options.butt_mode ? "Unleash Chaos" : "Achieve Serenity";
    status_kappa.innerHTML = disobj.options.kappa ? "Kappa!" : "Kappa?";
    auction_form.style.display = this.account ? "block" : "none";
    auction_form_header.innerHTML = "Submit A Bid!"
    auction_form_bid_label.innerHTML = "Bid Amount: ";
    auction_form_bid_input.type = "text";
    auction_form_smack_label.innerHTML = "Smack Talk: ";
    auction_form_smack_input.type = "text";
    auction_form_submit_input.type = "submit";
    auction_form_submit_input.value = "Bid";
    
    // Attach all those elements together
    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(footer);
    header.appendChild(tabbar);
    header.appendChild(topic);
    header.appendChild(auction);
    content.appendChild(chat);
    content.appendChild(userlist);
    footer.appendChild(inputbar);
    footer.appendChild(status);
    chat.appendChild(messages_wrapper);
    chat.appendChild(notification);
    messages_wrapper.appendChild(messages);
    messages_wrapper.appendChild(butts);
    inputbar.appendChild(form);
    form.appendChild(name);
    form.appendChild(input);
    form.appendChild(send);
    status_normal.appendChild(status_connected);
    status_normal.appendChild(document.createTextNode(" | "));
    status_normal.appendChild(status_account);
    status_special.appendChild(status_gethelp);
    status_special.appendChild(document.createTextNode(" | "));
    status_special.appendChild(status_hideulist);
    status_special.appendChild(document.createTextNode(" | "));
    status_special.appendChild(status_hideauction);
    status_special.appendChild(document.createTextNode(" | "));
    status_special.appendChild(status_buttmode);
    status_special.appendChild(document.createTextNode(" | "));
    status_special.appendChild(status_kappa);
    status.appendChild(status_normal);
    status.appendChild(status_special);
    auction_holder.appendChild(auction_title);
    auction_holder.appendChild(auction_bidder);
    auction_holder.appendChild(auction_bid);
    auction_holder.appendChild(auction_smack);
    auction.appendChild(auction_image);
    auction.appendChild(auction_holder);
    auction.appendChild(auction_form);
    auction_form.appendChild(auction_form_header);
    auction_form.appendChild(auction_form_bid);
    auction_form.appendChild(auction_form_smack);
    auction_form.appendChild(auction_form_submit);
    auction_form_bid.appendChild(auction_form_bid_label);
    auction_form_bid.appendChild(auction_form_bid_input);
    auction_form_smack.appendChild(auction_form_smack_label);
    auction_form_smack.appendChild(auction_form_smack_input);
    auction_form_submit.appendChild(auction_form_submit_input);
    
    // Add event listeners
    this.listen(container, "click", this.el_container_click, disobj);
    this.listen(container, "mousedown", this.el_container_mousedown, disobj);
    this.listen(container, "mouseup", this.el_container_mouseup, disobj);
    this.listen(auction, "mouseup", this.el_auction_mouseup, disobj);
    this.listen(form, "submit", this.el_form_submit, disobj);
    this.listen(input, "keydown", this.el_input_keydown, disobj);
    this.listen(status_gethelp, "click", this.el_gethelp_click, disobj);
    this.listen(status_hideulist, "click", this.el_hideulist_click, disobj);
    this.listen(status_hideauction, "click", this.el_hideauction_click, disobj);
    this.listen(status_buttmode, "click", this.el_buttmode_click, disobj);
    this.listen(status_kappa, "click", this.el_kappa_click, disobj);
    this.listen(auction_form, "submit", this.el_auction_form_submit, disobj);
    
    //set up Status window
    this.initChan("Status", disobj);
    this.activateChan("Status", disobj);
    this.displays.push(disobj);
};

jIRCs.prototype.initChan = function(channel, disobj) {
    var tab = document.createElement('span');
    tab.className = "jircs_tab";
    tab.appendChild(document.createTextNode(channel));
    this.listen(tab, "click", this.el_tab_click, disobj);
    if (channel != "Status") {
        var closeBtn = document.createElement("span");
        closeBtn.appendChild(document.createTextNode("X"));
        this.listen(closeBtn, "click", this.el_closebtn_click, disobj);
        closeBtn.className = "jircs_tab_closeBtn";
        tab.appendChild(closeBtn);
    }
    disobj.tabbar.appendChild(tab);
    disobj.tabs[channel] = tab;
    disobj.lines[channel] = [];
};

jIRCs.prototype.destroyChan = function(channel) {
    if (channel != 'Status' && channel in this.channels) {
        //part channel
        if(channel.charAt(0) == "#")
            this.send("PART",[channel]);
        //Iterate through displays
        this.forEach(this.displays, function(disobj) {
            //remove from DOM
            disobj.tabbar.removeChild(disobj.tabs[channel]);
            //destroy
            delete(disobj.tabs[channel]);
            if(channel == disobj.viewing) {
                //pick a channel to activate
                var newchan = disobj.history.pop();
                while (newchan && !disobj.tabs[newchan]) {
                    newchan = disobj.history.pop() || false;
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
    if (disobj.tabs[channel] && disobj.viewing != channel) {
        this.forEach(this.displays, function(idisobj) {
            this.forEach(idisobj.tabs, function(tab, chan) {
                var newClass = 'jircs_tab';
                if(idisobj != disobj && tab.className.indexOf("jircs_tab_active") != -1) {
                    newClass += ' jircs_tab_active';
                }
                if(chan != channel) {
                    if(tab.className.indexOf("jircs_tab_attention") != -1) {
                        newClass += " jircs_tab_attention"
                    }
                    if(tab.className.indexOf("jircs_tab_hilight") != -1) {
                        newClass += " jircs_tab_hilight"
                    }
                }
                tab.className = newClass;  
            }, this);
        }, this);
        disobj.tabs[channel].className += " jircs_tab_active";
        disobj.history.push(disobj.viewing);

        // TODO: Encapsulate lazy instantiation of channels
        if(!(channel in this.channels)) {
            // Initiate channel
            this.channels[channel] = {
                'users': new jSortedList(jUserKeyFunc, jUserCmpFunc),
                'modes': {},
            };
        }

        if (disobj.viewing && this.channels[disobj.viewing]) {
            this.channels[disobj.viewing].users.unregisterInsertCallback(disobj.userInsertCallback);
            this.channels[disobj.viewing].users.unregisterRemoveCallback(disobj.userRemoveCallback);
        }
        disobj.viewing = channel;
        disobj.userInsertCallback = this.userListInsert.bind(this, disobj);
        disobj.userRemoveCallback = this.userListRemove.bind(this, disobj);
        this.channels[disobj.viewing].users.registerInsertCallback(disobj.userInsertCallback);
        this.channels[disobj.viewing].users.registerRemoveCallback(disobj.userRemoveCallback);

        // Re-render (involves replacing all the messages)
        disobj.messages.innerHTML = "";
        this.forEach(disobj.lines[channel], function(line) {
            disobj.messages.appendChild(line.container);
        }, this);
        this.render(disobj);
        // Scroll to the bottom
        disobj.messages.scrollTop = disobj.messages.scrollHeight - disobj.messages.clientHeight;
    }
};

jIRCs.prototype.render = function(disobj) {
    // Re-generate topic
    disobj.topic.innerHTML = "";
    if(disobj.viewing in this.channels && this.channels[disobj.viewing].topic) {
        var tmsg = document.createElement('p');
        tmsg.appendChild(document.createTextNode(this.channels[disobj.viewing].topic.message));
        tmsg.className = 'jircs_topic_message';
        tmsg.innerHTML = this.formatLine(tmsg.innerHTML);
        disobj.topic.appendChild(tmsg);
        if(this.channels[disobj.viewing].topic.creator) {
            var tcreator = document.createElement('p');
            var msg = 'Set by ' + this.channels[disobj.viewing].topic.creator;
            if(this.channels[disobj.viewing].topic.time) { 
                var t = this.channels[disobj.viewing].topic.time;
                var h = '' + t.getHours();
                var m = '' + t.getMinutes();
                var s = '' + t.getSeconds();
                msg += ' on ' + (t.getMonth() + 1) + '/' + t.getDate() + '/' + t.getFullYear() + ' ' + (h.length > 1 ? h : '0'+h) + ':' + (m.length > 1 ? m : '0'+m) + ':' + (s.length > 1 ? s : '0'+s);
            }
            tcreator.appendChild(document.createTextNode(msg));
            tcreator.className = 'jircs_topic_creator';
            disobj.topic.appendChild(tcreator);
        }
    }
    // Re-generate auction
    // Re-generate userlist
    this.renderUserList(disobj);
    disobj.chat.style.width = disobj.options.show_userlist ? "85%" : "100%";
    // Re-generate input bar
    disobj.name.innerHTML = "";
    disobj.name.appendChild(document.createTextNode(this.nickname+"\u00A0")); // \u00A0 = non-breaking space
    disobj.input.style.width = "0px";
    disobj.input.style.width = (disobj.inputbar.clientWidth - disobj.form.offsetWidth - disobj.fudgeFactor) + "px";
    // Re-generate padding
    disobj.content.style.paddingTop = disobj.header.offsetHeight + "px";
    disobj.content.style.paddingBottom = disobj.footer.offsetHeight + "px";

    disobj.messages_wrapper.style.paddingBottom = disobj.notification.offsetHeight + "px";
};

jIRCs.prototype.renderUserList = function(disobj) {
    if(disobj.viewing in this.channels) {
        disobj.userlist.innerHTML = "";
        // Add users to DOM
        this.forEach(this.channels[disobj.viewing].users.array, function(user) {
            var p = document.createElement('p');
            this.listen(p, "click", this.el_userentry_click, disobj);
            var text = jUserKeyFunc(user);
            p.appendChild(document.createTextNode(text));
            p.className = 'jircs_userlist_user';
            disobj.userlist.appendChild(p);
            user.element = p;
        }, this);
    }
};

jIRCs.prototype.userListInsert = function(disobj, user, referenceUser) {
    var p = document.createElement('p');
    this.listen(p, "click", this.el_userentry_click, disobj);
    var text = jUserKeyFunc(user);
    p.appendChild(document.createTextNode(text));
    p.className = 'jircs_userlist_user';
    if(referenceUser) {
        disobj.userlist.insertBefore(p, referenceUser.element);
    } else {
        disobj.userlist.appendChild(p);
    }
    user.element = p;
};

jIRCs.prototype.userListRemove = function(disobj, user) {
    disobj.userlist.removeChild(user.element);
};

jIRCs.prototype.renderLine = function(channel, speaker, message, disobj) {
    if (!channel) {
        channel = "Status";
    }
    var now = new Date();
    var h = '' + now.getHours();
    var m = '' + now.getMinutes();
    var s = '' + now.getSeconds();
    var date = document.createElement('div');
    var user = document.createElement('div');
    var text = document.createElement('div');
    date.className = "jircs_chatDate";
    user.className = "jircs_chatUser";
    text.className = "jircs_chatText";
    if(speaker == '') {
        text.className += " jircs_action";
    }
    if(speaker == channel) {
        speaker = '';
        text.className += " jircs_event";
    }
    date.appendChild(document.createTextNode('[' + (h.length > 1 ? h : '0'+h) + ':' + (m.length > 1 ? m : '0'+m) + ':' + (s.length > 1 ? s : '0'+s) + ']'));
    user.appendChild(document.createTextNode("\u00A0"+speaker+"\u00A0")); // \u00A0 = non-breaking space
    text.appendChild(document.createTextNode(message));
    var nickCheck = new RegExp("\\b" + this.cleanRegex(this.nickname) + "\\b",'ig');
    text.innerHTML = this.formatLine(text.innerHTML);

    // Track open channels
    var open = [];
    this.forEach(this.displays, function(d) {
        open.push(d.viewing);
    }, this);
    var displays = this.displays;
    if(disobj) {
        displays = [disobj];
    }
    this.forEach(displays, function(disobj) {
        // Initialize the channel if we haven't seen it before
        if (!disobj.tabs[channel]) {
            this.initChan(channel, disobj);
        }
        // Do we need to scroll?
        var b = (disobj.messages.scrollHeight < disobj.messages.clientHeight || disobj.messages.scrollHeight <= disobj.messages.scrollTop + disobj.messages.clientHeight + 125); // 125px buffer just in case
        // Clone the row
        var r = document.createElement('div');
        var d = date.cloneNode(true);
        var u = user.cloneNode(true);
        var t = text.cloneNode(true);
        r.className = "jircs_chatRow";
        if(nickCheck.test(message)) { // Hilight
            r.className += " jircs_hilight";
        }
        r.appendChild(d); r.appendChild(u); r.appendChild(t);

        if(disobj.options.kappa) {
            t.innerHTML = this.kappafy(t.innerHTML);
        }
        // Add to the buffer
        disobj.lines[channel].push({
            "container": r,
            "time": d,
            "name": u,
            "message": t
        });
        while(disobj.lines[channel].length > this.scrollbackSize) {
            disobj.lines[channel].shift();
        }
        if(disobj.viewing == channel) {
            disobj.messages.appendChild(r);
            while(disobj.messages.children.length > this.scrollbackSize) {
                disobj.messages.removeChild(disobj.messages.firstChild);
            }
        }
        if(b) {
            disobj.messages.scrollTop = disobj.messages.scrollHeight; // Only scroll when user is at the bottom
        }
        if (open.indexOf(channel) == -1) {
            if(disobj.tabs[channel].className.indexOf("jircs_tab_attention") == -1) {
                disobj.tabs[channel].className += " jircs_tab_attention";
            }
            if(disobj.tabs[channel].className.indexOf("jircs_tab_hilight") == -1 && nickCheck.test(message)) {
                disobj.tabs[channel].className += " jircs_tab_hilight";
            }
        }
    }, this);
};

// This function is a disaster and should be fixed whenever possible
jIRCs.prototype.formatLine = function(line) {
    line = line.replace(this.url_regex, this.linkMunger); // Auto-linkify links
    line = line.replace(/([>\s])(#[^\s\a,:]+?)([<\s])/ig,'$1<a href="$2" class="jircs_channel_link">$2</a>$3'); // Auto-linkify channels
    
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
    return l;
};

jIRCs.prototype.kappafy = function(line) {
    var emotes = {
        "Kappa": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png" alt="Kappa">',
        "KappaHD": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png" alt="KappaHD">',
        "FrankerZ": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3b96527b46b1c941-40x30.png" alt="FrankerZ">',
        "lrrAWW": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2848-src-c214ffc58226eeb7-28x28.png" alt="lrrAWW">',
        "lrrCREEPY": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2847-src-22ff9f95382517b3-28x28.png" alt="lrrCREEPY">',
        "lrrFRUMP": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2468-src-9603d252a6f452f3-28x28.png" alt="lrrFRUMP">',
        "lrrSCOOP": '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2535-src-10c8688fd28296a1-28x28.png" alt="lrrSCOOP">'
    };
    for(var keyword in emotes) {
        if(!emotes.hasOwnProperty(keyword)) continue;
        line = line.replace(new RegExp("\\b" + keyword + "\\b", "g"), emotes[keyword]);
    };
    return line;
};

jIRCs.prototype.renderNotification = function(message, disobj) {
    if(disobj.note_timer) {
        clearTimeout(disobj.note_timer);
    }
    disobj.notification.innerHTML = "";
    disobj.notification.appendChild(document.createTextNode(message));
    this.render(disobj);
    disobj.note_timer = setTimeout(this.clearNotifications.bind(this, disobj), 5000);
};

jIRCs.prototype.clearNotifications = function(disobj){
        disobj.notification.innerHTML = "";
        this.render(disobj);
        disobj.note_timer = false;
};

jIRCs.prototype.setConnected = function(connected) {
    this.connected = connected == "Disconnected";
    this.forEach(this.displays, function(disobj) {
        disobj.status_connected.innerHTML = connected;
        this.render(disobj);
    }, this);
};

jIRCs.prototype.setAccount = function(account) {
    this.account = account;
    this.forEach(this.displays, function(disobj) {
        disobj.status_account.innerHTML = "";
        disobj.status_account.appendChild(document.createTextNode(account ? "Logged in as "+account : "Not Logged In"));
        disobj.auction_form.style.display = account ? "block" : "none";
        this.render(disobj);
    }, this);
};

jIRCs.prototype.auctionStart = function(id, name) {
    this.forEach(this.displays, function(disobj) {
        disobj.auction_running = true;
        if(disobj.options.show_auction) {
            disobj.auction.style.display = "block";
        }
        disobj.auction_image.src = "http://desertbus.org/images/prizes_irc/"+id+".jpg";
        disobj.auction_title.innerHTML = "";
        disobj.auction_title.appendChild(document.createTextNode(name));
        this.render(disobj);
    }, this);
};

jIRCs.prototype.auctionBid = function(bid, bidder, smack) {
    this.forEach(this.displays, function(disobj) {
        disobj.auction_bid.innerHTML = "";
        disobj.auction_bidder.innerHTML = "";
        disobj.auction_smack.innerHTML = "";
        disobj.auction_bid.appendChild(document.createTextNode(bid));
        disobj.auction_bidder.appendChild(document.createTextNode(bidder));
        disobj.auction_smack.appendChild(document.createTextNode(smack));
        this.render(disobj);
    }, this);
};

jIRCs.prototype.auctionStop = function() {
    this.forEach(this.displays, function(disobj) {
        disobj.auction_running = false;
        disobj.auction.style.display = "none";
        this.render(disobj);
    }, this);
};

// Event Listeners
jIRCs.prototype.el_container_click = function(disobj, e) {
    if(e.target && e.target.className == 'jircs_channel_link') {
        this.send('JOIN',[e.target.innerHTML]);
        this.cancelEvent(e);
    }
};

jIRCs.prototype.el_container_mousedown = function(disobj, e) {
    disobj.mouse = {'x':e.screenX,'y':e.screenY};
};

jIRCs.prototype.el_container_mouseup = function(disobj, e) {
    if(!('mouse' in disobj && 'x' in disobj.mouse && 'y' in disobj.mouse)) {
        disobj.input.focus();
        return;
    }
    var dx = disobj.mouse.x - e.screenX, dy = disobj.mouse.y - e.screenY;
    if(dx < 0) {
        dx *= -1;
    }
    if(dy < 0) {
        dy *= -1;
    }
    if(dx < 5 && dy < 5 && e.button == 0) { //Make sure text selection works as expected
        disobj.input.focus();
    }
};

jIRCs.prototype.el_auction_mouseup = function(disobj, e) {
    this.cancelEvent(e); // Prevent focus to input box
};

jIRCs.prototype.el_form_submit = function(disobj, e) {
    this.cancelEvent(e);
    if(!disobj.input.value)
        return;
    this.handleLine(disobj.input.value, disobj);
    disobj.input.value = '';
};

jIRCs.prototype.el_input_keydown = function(disobj, e) {
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
        this.forEach(this.channels[disobj.viewing].users.array, function(user) {
            var n = user.nickname;
            if(n.substring(0,name.length).toLowerCase() == name.toLowerCase()) {
                possible.push(n);
            }
        }, this);
        if(possible.length == 1) {
            name = possible[0];
        } else if(possible.length == 0) {
            this.renderNotification('No Possible Nicknames', disobj);
        } else {
            this.renderNotification('Possible Nicknames: '+possible.join(' '), disobj);
        }
        e.target.value = e.target.value.substring(0,begin) + name + e.target.value.substr(end);
        this.cancelEvent(e);
    }
};

jIRCs.prototype.el_tab_click = function(disobj, e) {
    this.activateChan(e.target.firstChild.nodeValue, disobj);
};

jIRCs.prototype.el_closebtn_click = function(disobj, e) {
    this.destroyChan(e.target.parentNode.firstChild.nodeValue);
};

jIRCs.prototype.el_hideulist_click = function(disobj, e) {
    this.cancelEvent(e);
    disobj.options.show_userlist = !disobj.options.show_userlist;
    disobj.userlist.style.display = disobj.options.show_userlist ? "inline-block" : "none";
    disobj.status_hideulist.innerHTML = disobj.options.show_userlist ? "Hide Users" : "Show Users";
    this.render(disobj);
};

jIRCs.prototype.el_gethelp_click = function(disobj, e) {
    this.cancelEvent(e);
    this.send("JOIN",["#help"]);
};

jIRCs.prototype.el_hideauction_click = function(disobj, e) {
    this.cancelEvent(e);
    disobj.options.show_auction = !disobj.options.show_auction;
    disobj.auction.style.display = disobj.options.show_auction && disobj.auction_running ? "block" : "none";
    disobj.status_hideauction.innerHTML = disobj.options.show_auction ? "Hide Auction Bar" : "Show Auction Bar";
    this.render(disobj);
};

jIRCs.prototype.el_buttmode_click = function(disobj, e) {
    this.cancelEvent(e);
    disobj.options.butt_mode = !disobj.options.butt_mode;
    disobj.status_buttmode.innerHTML = disobj.options.butt_mode ? "Unleash Chaos" : "Achieve Serenity";
    disobj.messages.style.display = disobj.options.butt_mode ? "none" : "block";
    disobj.butts.style.display = disobj.options.butt_mode ? "block" : "none";
    this.render(disobj);
};

jIRCs.prototype.el_kappa_click = function(disobj, e) {
    this.cancelEvent(e);
    disobj.options.kappa = !disobj.options.kappa;
    disobj.status_kappa.innerHTML = disobj.options.kappa ? "Kappa!" : "Kappa?";
    this.render(disobj);
};

jIRCs.prototype.el_auction_form_submit = function(disobj, e) {
    this.cancelEvent(e);
    if(!disobj.auction_form_bid_input.value)
        return;
    var args = [disobj.auction_form_bid_input.value.split(" ")[0]]; // Get the bid value and set it as the first argument
    args = args.concat(disobj.auction_form_smack_input.value.split(" ")); // Add smack talk
    this.command_BID(args, disobj);
    disobj.auction_form_bid_input.value = '';
    disobj.auction_form_smack_input.value = '';
};

jIRCs.prototype.el_userentry_click = function(disobj, e) {
    var nick = e.target.firstChild.nodeValue.toLowerCase();
    if(nick.charAt(0) in this.statusSymbols)
        nick = nick.substr(1);

    if(!(nick in this.channels)) {
        // Initiate channel
        this.channels[nick] = {
            'users': new jSortedList(jUserKeyFunc, jUserCmpFunc),
            'modes': {},
        };
    }
    this.renderLine(nick, nick, "You have begun messaging " + nick);
    this.activateChan(nick, disobj);
};
