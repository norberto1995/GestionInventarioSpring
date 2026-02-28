package Gestion.demo.factus.mapper;

import Gestion.demo.factus.dto.request.FactusCustomerDTO;
import Gestion.demo.factus.dto.request.FactusFacturaRequestDTO;
import Gestion.demo.factus.dto.request.FactusItemDTO;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.DetalleVenta;
import Gestion.demo.modelo.Venta;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Component
public class FactusFacturaMapper {

    public FactusFacturaRequestDTO mapFromVenta(Venta venta) {

        System.out.println("Cantidad de detalles: " + venta.getDetalles().size());
        FactusFacturaRequestDTO f = new FactusFacturaRequestDTO();

        f.setNumberingRangeId(venta.getNumberingRangeId());  //puedo colocarlo  manualmente
        f.setReferenceCode(
                venta.getReferenceCode() != null ?
                        venta.getReferenceCode() :
                        "VENTA---" + venta.getIdVenta()
        );

        f.setObservation("Factura generada desde sistema POS");


        // Forma optimizada
        String formaPago = Optional.ofNullable(venta.getPaymentForm()).orElse("1");
        f.setPaymentForm(formaPago);

        f.setPaymentMethodCode(
                Optional.ofNullable(venta.getPaymentMethodCode()).orElse("10")
        );

        if ("2".equals(formaPago)) {
            f.setPaymentDueDate(venta.getPaymentDueDate());
        } else {
            f.setPaymentDueDate(null);
        }



        f.setOperationType(
                Optional.ofNullable(venta.getOperationType()).orElse("10")
        );
        f.setSendEmail(true);

        f.setCustomer(mapCustomer(venta.getCliente()));
        f.setItems(mapItems(venta.getDetalles()));

        return f;
    }

    private FactusCustomerDTO mapCustomer(Cliente c) {

        FactusCustomerDTO fc = new FactusCustomerDTO();

        fc.setIdentification(c.getDocumento());
        fc.setDv(c.getDv());
        fc.setNames(c.getNombre());
        fc.setEmail(c.getEmail());
        fc.setPhone(c.getTelefono());
        fc.setAddress(c.getDireccion());

        fc.setIdentificationDocumentId(c.getIdentificationDocumentId());
        fc.setLegalOrganizationId(c.getLegalOrganizationId());
        fc.setMunicipalityId(c.getMunicipio().getId());
        fc.setTributeId(c.getTributeId());

        return fc;
    }



    private List<FactusItemDTO> mapItems(List<DetalleVenta> detalles) {

        DecimalFormat df = new DecimalFormat("0.00");

        return detalles.stream().map(d -> {

            FactusItemDTO fi = new FactusItemDTO();

            fi.setCodeReference(d.getProducto().getCodigo());
            fi.setName(d.getProducto().getNombre());
            fi.setQuantity(d.getCantidad());
            fi.setPrice(d.getPrecioUnitario() + d.getValorIva());
            fi.setDiscountRate(d.getDescuento());

            // Convertimos IVA a formato String "19.00"
            String taxRateFormatted = df.format(
                    d.getProducto().getIva()
            ).replace(",", ".");

            fi.setTaxRate(taxRateFormatted);

            fi.setUnitMeasureId(
                    Optional.ofNullable(d.getUnitMeasureId()).orElse(70)
            );

            fi.setStandardCodeId(
                    Optional.ofNullable(d.getStandardCodeId()).orElse(1)
            );

            fi.setTributeId(
                    Optional.ofNullable(d.getTributeId()).orElse(1)
            );

            fi.setIsExcluded(Boolean.TRUE.equals(d.getIsExcluded()) ? 1 : 0);



            return fi;

        }).toList();
    }


}



