import sys

incoming = str(sys.argv)

split = list(incoming.split(","))

ssidpre = split[1]

ssid = ssidpre[10:]

pskpre = split[2]

psk = pskpre[10:-3]

file1 = open("/etc/wpa_supplicant/wpa_supplicant.conf", "a")
file1.write("network={\n")
file1.write("	ssid=")
file1.write(ssid + "\n")
file1.write("	psk=")
file1.write(psk + "\n")
file1.write("}\n")
file1.close()
