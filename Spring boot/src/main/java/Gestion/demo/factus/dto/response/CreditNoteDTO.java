package Gestion.demo.factus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreditNoteDTO {

    private Integer id;
    private String number;
    private String reference_code;
    private Integer status;

    private String qr;
    private String cude;
    private String validated;

    private String gross_value;
    private String taxable_amount;
    private String tax_amount;
    private String total;

    private String observation;

    private Integer bill_id;
    private String cufe;
    private String number_bill;

    private String  public_url;
}
