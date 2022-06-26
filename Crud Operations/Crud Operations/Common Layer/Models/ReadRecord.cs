namespace Crud_Operations.Common_Layer.Models
{
    public class ReadRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = "";

       public List<ReadRecoderData>? readRecordData { get; set; }

    }

    public class ReadRecoderData
    {
        public string UserName { get; set; } = "";

        public int Age { get; set; }

        public int Id { get; set; }
    }
}
