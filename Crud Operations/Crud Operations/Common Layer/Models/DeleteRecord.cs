namespace Crud_Operations.Common_Layer.Models
{
    public class DeleteRecordRequest
    {
        public int Id { get; set; }
    }

    public class DeleteRecordResponse
    {
        public string Message { get; set; } = "";
        public bool IsSuccess { get; set; }
    }
}
