package Gestion.demo.factus.mapper;

import Gestion.demo.factus.dto.request.FactusCustomerDTO;
import Gestion.demo.factus.dto.request.FactusItemDTO;
import Gestion.demo.factus.dto.request.FactusNotaCreditoRequestDTO;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.DetalleNotaCredito;
import Gestion.demo.modelo.NotaCredito;
import Gestion.demo.modelo.TipoNotaCredito;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

@Component
public class FactusNotaCreditoMapper {

    public FactusNotaCreditoRequestDTO mapFromNotaCredito(NotaCredito nc) {

        FactusNotaCreditoRequestDTO f = new FactusNotaCreditoRequestDTO();

        f.setNumberingRangeId(nc.getNumberingRangeId());
        f.setCorrectionConceptCode(
                nc.getTipo() == TipoNotaCredito.ANULACION ? 1 : 2
        );

        f.setCustomizationId(20);
        f.setBillId(nc.getVenta().getBillId());
        f.setReferenceCode(nc.getReferenceCode());
        f.setObservation(nc.getMotivo());
        f.setPaymentMethodCode(
                nc.getPaymentMethodCode() != null ? nc.getPaymentMethodCode() : "10"
        );

        f.setCustomer(mapCustomer(nc.getCliente()));
        f.setItems(mapItems(nc.getDetalles()));

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

    private List<FactusItemDTO> mapItems(List<DetalleNotaCredito> detalles) {

        return detalles.stream().map(d -> {

            FactusItemDTO fi = new FactusItemDTO();

            fi.setCodeReference(d.getProducto().getCodigo());
            fi.setName(d.getProducto().getNombre());
            fi.setQuantity(d.getCantidad());
            fi.setPrice(d.getPrecioUnitario() + d.getValorIva());
            fi.setDiscountRate(d.getDescuento());

           fi.setTaxRate(String.format(Locale.US, "%.2f", d.getTaxRate())); ;

            fi.setUnitMeasureId(d.getUnitMeasureId());
            fi.setStandardCodeId(d.getStandardCodeId());
            fi.setTributeId(d.getTributeId());
            fi.setIsExcluded(d.getIsExcluded());

            return fi;

        }).toList();
    }
}
