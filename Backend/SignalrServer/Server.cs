using SignalrServer.Models;

namespace SignalrServer;

public static class Server
{
    private static List<User> _users = new List<User>();
    public static int TotalUsers => _users.Count;

    internal static void AddUser(string connectionId)
    {
        var user = FindUser(connectionId);
        if (user == null)
        {
            _users.Add(new User
            {
                ConnectionId = connectionId,
            });
        }
    }

    internal static void RemoveUser(string connectionId)
    {
        var user = FindUser(connectionId);
        if (user != null)
        {
            _users.Remove(user);
        }
    }

    private static User? FindUser(string connectionId) => _users.FirstOrDefault(user  => user.ConnectionId == connectionId);
}
