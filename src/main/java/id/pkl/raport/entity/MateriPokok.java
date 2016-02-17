package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="materi_pokok")
public class MateriPokok {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
	@NotBlank
	@Column(name="indikator")
	private String indikator;
	
	@ManyToOne
	@JoinColumn(name="kompetensi_dasar_id", referencedColumnName="id")
	private KompetensiDasar kompetensiDasar;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIndikator() {
		return indikator;
	}

	public void setIndikator(String indikator) {
		this.indikator = indikator;
	}

	public KompetensiDasar getKompetensiDasar() {
		return kompetensiDasar;
	}

	public void setKompetensiDasar(KompetensiDasar kompetensiDasar) {
		this.kompetensiDasar = kompetensiDasar;
	}
	
	
}
