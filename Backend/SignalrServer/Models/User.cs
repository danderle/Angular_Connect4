namespace SignalrServer.Models;

public class User
{
    public string ConnectionId { get; set; }
    public bool IsWaiting { get; set; }
    public string? OpponentId { get; set; }
}
