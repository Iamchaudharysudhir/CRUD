using Crud_Operations.Common_Layer.Models;
using Crud_Operations.Service_Layer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Operations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudOperationController : ControllerBase
    {
        public readonly ICrudOperationSL _crudOperationSL;


        public CrudOperationController(ICrudOperationSL crudOperationSL)
        {
            _crudOperationSL = crudOperationSL;
        }

        [HttpPost]
        [Route("CreateRecord")]
        public async Task<IActionResult> CreateRecord(CreateRecordRequest request)
        {
            CreateRecordResponse response = new CreateRecordResponse();

            try
            {
                response = await _crudOperationSL.CreateRecord(request);
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;

            }

            return Ok(response);
        }


        [HttpGet]
        [Route("ReadRecord")]

        public async Task<IActionResult> ReadRecord()
        {
            ReadRecordResponse response = new ReadRecordResponse();

            try
            {
                response = await _crudOperationSL.ReadRecord();
            }catch(Exception ex)
            {
                response.IsSuccess=false;
                response.Message=ex.Message;
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateRecord")]

        public async Task<IActionResult> UpdateRecord(UpdateRecordRequest request)
        {
            UpdateRecordResponse response = new UpdateRecordResponse();

            try
            {
                response = await _crudOperationSL.UpdateRecord(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }


        [HttpDelete]
        [Route("DeleteRecord")]

        public async Task<IActionResult> DeleteRecord(DeleteRecordRequest request)
        {
            DeleteRecordResponse response = new DeleteRecordResponse();

            try
            {
                response = await _crudOperationSL.DeleteRecord(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

    }
}
