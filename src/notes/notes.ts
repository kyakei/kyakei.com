// Imports from 'Active Directory'
import adCsNtlmRelayMd from './Active Directory/AD CS/NTLM Relay Attack (ESC8).md?raw'
import adCsNoPkinitMd from './Active Directory/AD CS/No PKINIT.md?raw'
import adCsShadowCredsMd from './Active Directory/AD CS/Shadow Credentials (msDS-KeyCredentialLink).md?raw'
import adCheatSheetMd from './Active Directory/Active Directory Cheat Sheet.md?raw'
import adChecklistMd from './Active Directory/Active Directory Checklist.md?raw'
import adCanvas from './Active Directory/Active Directory.canvas?raw'
import kerberoastingMd from './Active Directory/Kerberoasting.md?raw'

// Imports from 'Cracking'
import advancedRdpBruteMd from './Cracking/Advanced RDP Bruteforcing.md?raw'
import bitlockerMd from './Cracking/Bitlocker.md?raw'
import bruteFtpMd from './Cracking/Brute Forcing FTP.md?raw'
import bruteSmbMd from './Cracking/Brute Forcing SMB.md?raw'
import crackingFilesMd from './Cracking/Cracking files.md?raw'
import defaultCredsMd from './Cracking/Default Credentials.md?raw'
import httpAuthMd from './Cracking/HTTP Authentication.md?raw'
import hydraMd from './Cracking/Hydra.md?raw'

// Imports from 'File Transfer'
import ftpMd from './File Transfer/FTP.md?raw'
import transferAttackerCanvas from './File Transfer/Transfer Files to ATTACKER.canvas?raw'
import transferVictimCanvas from './File Transfer/Transfer Files to VICTIM.canvas?raw'
import usingNetcatMd from './File Transfer/Using Netcat.md?raw'

// Imports from 'Linux'
import basicLinuxPeCanvas from './Linux/Basic Linux PE Flow.canvas?raw'
import cronJobAbuseMd from './Linux/Cron Job Abuse.md?raw'
import linuxPrivescCanvas from './Linux/Linux Privilege Escalation.canvas?raw'
import sshForwardingMd from './Linux/SSH Forwarding.md?raw'

// Imports from 'Pivoting'
import ligoloNgMd from './Pivoting/Ligolo-Ng.md?raw'
import pivotingLigoloCanvas from './Pivoting/Pivoting with Ligolo-ng.canvas?raw'

// Imports from 'Services'
import smbMd from './Services/139,445 - SMB.md?raw'
import sqlMd from './Services/1433 - SQL.md?raw'
import nfsMd from './Services/2049 - mountd or nfs.md?raw'
import ftpServiceMd from './Services/21 - FTP.md?raw'
import emailMd from './Services/25,143,110,465,587,993,995 - Email.md?raw'
import rdpMd from './Services/3389 - RDP.md?raw'
import dnsMd from './Services/53 - DNS.md?raw'
import rpcMd from './Services/RPC.md?raw'
import toolsInteractMd from './Services/Tools to Interact with Common Services.md?raw'

// Imports from 'Web'
import ffufMd from './Web/FFUF.md?raw'
import nosqlInjectionMd from './Web/NoSQL Injection.md?raw'
import webshellsMd from './Web/One place for all Webshells.md?raw'

// Imports from 'Windows'
import basicPowershellMd from './Windows/Basic Powershell Commands.md?raw'
import powerViewCanvas from './Windows/PowerView.canvas?raw'
import windowsPeFlowCanvas from './Windows/Windows PE Flow.canvas?raw'
import windowsPrivescCanvas2 from './Windows/Windows Privilege Escalation.canvas?raw' // Renaming to avoid conflict if needed, or just use this one

// Root files
import conceptAttackCanvas from './The Concept of Attack.canvas?raw'



export interface Note {
    slug: string
    title: string
    date: string
    folder: string
    tags: string[]
    content: string
    type?: 'markdown' | 'canvas'
}

export const notes: Note[] = [
    // --- Active Directory ---
    {
        slug: 'ad-cs-ntlm-relay',
        title: 'NTLM Relay Attack (ESC8)',
        date: '2025-02-18',
        folder: 'Active Directory/AD CS',
        tags: ['AD', 'ADCS', 'NTLM', 'Relay'],
        content: adCsNtlmRelayMd,
    },
    {
        slug: 'ad-cs-no-pkinit',
        title: 'No PKINIT?',
        date: '2025-02-18',
        folder: 'Active Directory/AD CS',
        tags: ['AD', 'ADCS', 'PKINIT'],
        content: adCsNoPkinitMd,
    },
    {
        slug: 'ad-cs-shadow-credentials',
        title: 'Shadow Credentials',
        date: '2025-02-18',
        folder: 'Active Directory/AD CS',
        tags: ['AD', 'ADCS', 'Shadow Credentials'],
        content: adCsShadowCredsMd,
    },
    {
        slug: 'active-directory-cheat-sheet',
        title: 'Active Directory Cheat Sheet',
        date: '2025-02-18',
        folder: 'Active Directory',
        tags: ['AD', 'Cheatsheet'],
        content: adCheatSheetMd,
    },
    {
        slug: 'active-directory-checklist',
        title: 'Active Directory Checklist',
        date: '2025-02-18',
        folder: 'Active Directory',
        tags: ['AD', 'Checklist'],
        content: adChecklistMd,
    },
    {
        slug: 'active-directory-canvas',
        title: 'Active Directory Overview',
        date: '2025-02-18',
        folder: 'Active Directory',
        tags: ['AD', 'Overview'],
        content: adCanvas,
        type: 'canvas',
    },
    {
        slug: 'kerberoasting',
        title: 'Kerberoasting',
        date: '2025-02-18',
        folder: 'Active Directory',
        tags: ['AD', 'Kerberos', 'Roasting'],
        content: kerberoastingMd,
    },

    // --- Cracking ---
    {
        slug: 'advanced-rdp-bruteforcing',
        title: 'Advanced RDP Bruteforcing',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['RDP', 'Bruteforce'],
        content: advancedRdpBruteMd,
    },
    {
        slug: 'bitlocker',
        title: 'Bitlocker',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['Bitlocker', 'Encryption'],
        content: bitlockerMd,
    },
    {
        slug: 'brute-forcing-ftp',
        title: 'Brute Forcing FTP',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['FTP', 'Bruteforce'],
        content: bruteFtpMd,
    },
    {
        slug: 'brute-forcing-smb',
        title: 'Brute Forcing SMB',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['SMB', 'Bruteforce'],
        content: bruteSmbMd,
    },
    {
        slug: 'cracking-files',
        title: 'Cracking Files',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['Cracking', 'Files'],
        content: crackingFilesMd,
    },
    {
        slug: 'default-credentials',
        title: 'Default Credentials',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['Credentials', 'Default'],
        content: defaultCredsMd,
    },
    {
        slug: 'http-authentication',
        title: 'HTTP Authentication',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['HTTP', 'Auth', 'Bruteforce'],
        content: httpAuthMd,
    },
    {
        slug: 'hydra',
        title: 'Hydra',
        date: '2025-02-18',
        folder: 'Cracking',
        tags: ['Hydra', 'Tool'],
        content: hydraMd,
    },

    // --- File Transfer ---
    {
        slug: 'file-transfer-ftp',
        title: 'File Transfer - FTP',
        date: '2025-02-18',
        folder: 'File Transfer',
        tags: ['FTP', 'Transfer'],
        content: ftpMd,
    },
    {
        slug: 'transfer-files-attacker',
        title: 'Transfer Files to ATTACKER',
        date: '2025-02-18',
        folder: 'File Transfer',
        tags: ['Transfer', 'Exfiltration'],
        content: transferAttackerCanvas,
        type: 'canvas',
    },
    {
        slug: 'transfer-files-victim',
        title: 'Transfer Files to VICTIM',
        date: '2025-02-18',
        folder: 'File Transfer',
        tags: ['Transfer', 'Ingress'],
        content: transferVictimCanvas,
        type: 'canvas',
    },
    {
        slug: 'using-netcat',
        title: 'Using Netcat',
        date: '2025-02-18',
        folder: 'File Transfer',
        tags: ['Netcat', 'Transfer'],
        content: usingNetcatMd,
    },

    // --- Linux ---
    {
        slug: 'basic-linux-pe-flow',
        title: 'Basic Linux PE Flow',
        date: '2025-02-18',
        folder: 'Linux',
        tags: ['Linux', 'PrivEsc', 'Flow'],
        content: basicLinuxPeCanvas,
        type: 'canvas',
    },
    {
        slug: 'cron-job-abuse',
        title: 'Cron Job Abuse',
        date: '2025-02-18',
        folder: 'Linux',
        tags: ['Linux', 'Cron', 'PrivEsc'],
        content: cronJobAbuseMd,
    },
    {
        slug: 'linux-privesc-canvas',
        title: 'Linux Privilege Escalation (Canvas)',
        date: '2025-02-18',
        folder: 'Linux',
        tags: ['Linux', 'PrivEsc'],
        content: linuxPrivescCanvas,
        type: 'canvas',
    },
    {
        slug: 'ssh-forwarding',
        title: 'SSH Forwarding',
        date: '2025-02-18',
        folder: 'Linux',
        tags: ['SSH', 'Tunneling'],
        content: sshForwardingMd,
    },

    // --- Pivoting ---
    {
        slug: 'ligolo-ng',
        title: 'Ligolo-Ng',
        date: '2025-02-18',
        folder: 'Pivoting',
        tags: ['Pivoting', 'Ligolo'],
        content: ligoloNgMd,
    },
    {
        slug: 'pivoting-ligolo-canvas',
        title: 'Pivoting with Ligolo-ng',
        date: '2025-02-18',
        folder: 'Pivoting',
        tags: ['Pivoting', 'Ligolo'],
        content: pivotingLigoloCanvas,
        type: 'canvas',
    },

    // --- Services ---
    {
        slug: 'smb-service',
        title: 'SMB (139, 445)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['SMB', 'Service'],
        content: smbMd,
    },
    {
        slug: 'sql-service',
        title: 'SQL (1433)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['SQL', 'Database'],
        content: sqlMd,
    },
    {
        slug: 'nfs-service',
        title: 'NFS/Mountd (2049)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['NFS', 'Service'],
        content: nfsMd,
    },
    {
        slug: 'ftp-service',
        title: 'FTP (21)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['FTP', 'Service'],
        content: ftpServiceMd,
    },
    {
        slug: 'email-services',
        title: 'Email Services',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['Email', 'SMTP', 'POP3', 'IMAP'],
        content: emailMd,
    },
    {
        slug: 'rdp-service',
        title: 'RDP (3389)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['RDP', 'Service'],
        content: rdpMd,
    },
    {
        slug: 'dns-service',
        title: 'DNS (53)',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['DNS', 'Service'],
        content: dnsMd,
    },
    {
        slug: 'rpc-service',
        title: 'RPC',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['RPC', 'Service'],
        content: rpcMd,
    },
    {
        slug: 'tools-interact-services',
        title: 'Tools to Interact with Services',
        date: '2025-02-18',
        folder: 'Services',
        tags: ['Tools', 'Services'],
        content: toolsInteractMd,
    },

    // --- Web ---
    {
        slug: 'ffuf',
        title: 'FFUF',
        date: '2025-02-18',
        folder: 'Web',
        tags: ['Web', 'Fuzzing', 'FFUF'],
        content: ffufMd,
    },
    {
        slug: 'nosql-injection',
        title: 'NoSQL Injection',
        date: '2025-02-18',
        folder: 'Web',
        tags: ['Web', 'Injection', 'NoSQL'],
        content: nosqlInjectionMd,
    },
    {
        slug: 'webshells',
        title: 'Webshells Collection',
        date: '2025-02-18',
        folder: 'Web',
        tags: ['Web', 'Shells'],
        content: webshellsMd,
    },

    // --- Windows ---
    {
        slug: 'basic-powershell',
        title: 'Basic Powershell Commands',
        date: '2025-02-18',
        folder: 'Windows',
        tags: ['Windows', 'Powershell'],
        content: basicPowershellMd,
    },
    {
        slug: 'powerview',
        title: 'PowerView',
        date: '2025-02-18',
        folder: 'Windows',
        tags: ['Windows', 'AD', 'PowerView'],
        content: powerViewCanvas,
        type: 'canvas',
    },
    {
        slug: 'windows-pe-flow',
        title: 'Windows PE Flow',
        date: '2025-02-18',
        folder: 'Windows',
        tags: ['Windows', 'PrivEsc', 'Flow'],
        content: windowsPeFlowCanvas,
        type: 'canvas',
    },
    {
        slug: 'windows-privesc-canvas-2',
        title: 'Windows Privilege Escalation (Canvas)',
        date: '2025-02-18',
        folder: 'Windows',
        tags: ['Windows', 'PrivEsc'],
        content: windowsPrivescCanvas2,
        type: 'canvas',
    },

    // --- Root / Methodology ---
    {
        slug: 'concept-of-attack',
        title: 'The Concept of Attack',
        date: '2025-02-18',
        folder: 'Methodology',
        tags: ['Methodology', 'Concept'],
        content: conceptAttackCanvas,
        type: 'canvas',
    },


]
